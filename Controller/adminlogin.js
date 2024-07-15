const jwt = require("jsonwebtoken");
const express = require("express");
const Connection = require("../Connection");
const bcrypt = require("bcrypt");

require("dotenv").config()

async function handleLogin(req, res) {
    const { username, password } = req.body;

    if (!username || username.trim() === "") {
        return res
            .status(404)
            .json({ ResponseCode: 0, message: "Username is required" })
    }

    if (!password || password.trim() === "") {
        return res
            .status(404)
            .json({ ResponseCode: 0, message: "Password is required" })
    }

    // Query to retrieve the user's hashed password from the database
    const userQuery = "CALL SPsearchadmin(?)";

    try {
        Connection.query(userQuery, [username], async (err, results) => {
            if (err) {
                console.log(err);
                return res
                    .status(500)
                    .json({ ResponseCode: 0, message: err })
            }
            if (results[0][0].ResponseCode === 0) {
                return res
                    .status(401)
                    .json({ ResponseCode: 0, message: "Invalid username" })
            }

            const user = results[0][0];

            if (user.username) {
                const passwordMatch = await bcrypt.compare(password, user?.password);

                if (!passwordMatch) {
                    return res
                        .status(401)
                        .json({ ResponseCode: 0, message: "Check your password" })
                }

                // Call the stored procedure
                const query = "CALL SPadminlogin(?,?)";
                Connection.query(query, [username, user.password], (err, results) => {
                    if (err) {
                        console.log(err);
                        return res
                            .status(500)
                            .json({ ResponseCode: 0, message: "Error finding user, Try again" })
                    }

                    // Extract the message from the stored procedure's result
                    const token = jwt.sign(
                        { id: user.id, username: user.username },
                        process.env.ACCESS_TOKEN_SECRET,
                        { expiresIn: "1d" }
                    );

                    res
                        .cookie('token', token, {
                            path: '/',
                            domain: 'localhost',
                            // httpsOnly: true, // Prevents client-side scripts from accessing the cookie
                            secure: process.env.NODE_ENV === 'production', // Ensures the cookie is only sent over HTTPS in production
                            maxAge: 24 * 15 * 60 * 1000, // 1 day minutes
                            sameSite: 'Strict', // Ensures the cookie is only sent in first-party context
                        });

                    return res
                        .status(200)
                        .json({
                            ResponseCode: 1,
                            message: "User logged in successfully",
                            username: user.username
                        })

                });
            }
        });
    } catch (error) {
        return res
            .status(404)
            .json({ message: "Something went wrong" })
    }
}

module.exports = { handleLogin };