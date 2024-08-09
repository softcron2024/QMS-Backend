const jwt = require("jsonwebtoken");
const express = require("express");
const Connection = require("../Connection");
const bcrypt = require("bcrypt");

require("dotenv").config();

async function handleLogin(req, res) {
    const { username, password } = req.body;

    if (!username || username.trim() === "") {
        return res
            .status(200)
            .json({ ResponseCode: 0, message: "Username is required" });
    }

    if (!password || password.trim() === "") {
        return res
            .status(200)
            .json({ ResponseCode: 0, message: "Password is required" });
    }

    const userQuery = "CALL SPsearchadmin(?)";

    try {
        Connection.query(userQuery, [username], async (err, results) => {
            if (err) {
                console.log(err);
                
                let message = "Error finding user, Try again";
                let responseCode = 0;

                switch (err.code) {
                    case 'ER_BAD_DB_ERROR':
                        message = "Database not found.";
                        break;
                    case 'ER_ACCESS_DENIED_ERROR':
                        message = "Access denied.";
                        break;
                    case 'PROTOCOL_CONNECTION_LOST':
                        message = "Database connection was closed.";
                        break;
                    case 'ER_CON_COUNT_ERROR':
                        message = "Database has too many connections.";
                        break;
                    case 'ER_PARSE_ERROR':
                        message = "SQL query syntax error.";
                        break;
                    case 'ER_NO_SUCH_TABLE':
                        message = "Table does not exist.";
                        break;
                    case 'ER_LOCK_WAIT_TIMEOUT':
                        message = "Lock wait timeout exceeded; try restarting transaction.";
                        break;
                    case 'ER_QUERY_TIMEOUT':
                        message = "Query execution was interrupted.";
                        break;
                    case 'ECONNREFUSED':
                        message = "Database connection was refused.";
                        break;
                    case 'ETIMEDOUT':
                        message = "Database connection timed out.";
                        break;
                    case 'EHOSTUNREACH':
                        message = "Database host is unreachable.";
                        break;
                    case 'ENETUNREACH':
                        message = "Network is unreachable.";
                        break;
                    case 'ECONNRESET':
                        message = "Connection was reset.";
                        break;
                    case 'ENOTFOUND':
                        message = "Database host not found.";
                        break;
                    case 'ERR_INVALID_ARG_TYPE':
                        message = "Invalid argument type provided.";
                        break;
                    case 'ERR_INVALID_CALLBACK':
                        message = "Invalid callback function provided.";
                        break;
                    case 'ERR_HTTP_HEADERS_SENT':
                        message = "Cannot send headers after they are sent to the client.";
                        break;
                    default:
                        message = "An unexpected error occurred. Please try again later.";
                }

                return res.status(500).json({ ResponseCode: responseCode, message });
            }

            if (results[0][0].ResponseCode === 0) {
                return res
                    .status(200)
                    .json({ ResponseCode: 0, message: "Invalid username" });
            }

            const user = results[0][0];

            if (user.username) {
                const passwordMatch = await bcrypt.compare(password, user?.password);

                if (!passwordMatch) {
                    return res
                        .status(200)
                        .json({ ResponseCode: 0, message: "Check your password" });
                }

                const query = "CALL SPadminlogin(?,?)";
                Connection.query(query, [username, user.password], (err, results) => {
                    if (err) {
                        console.log(err);
                        
                        let message = "Error logging in user, Try again";
                        let responseCode = 0;

                        switch (err.code) {
                            case 'ER_BAD_DB_ERROR':
                                message = "Database not found.";
                                break;
                            case 'ER_ACCESS_DENIED_ERROR':
                                message = "Access denied.";
                                break;
                            case 'PROTOCOL_CONNECTION_LOST':
                                message = "Database connection was closed.";
                                break;
                            case 'ER_CON_COUNT_ERROR':
                                message = "Database has too many connections.";
                                break;
                            case 'ER_PARSE_ERROR':
                                message = "SQL query syntax error.";
                                break;
                            case 'ER_NO_SUCH_TABLE':
                                message = "Table does not exist.";
                                break;
                            case 'ER_LOCK_WAIT_TIMEOUT':
                                message = "Lock wait timeout exceeded; try restarting transaction.";
                                break;
                            case 'ER_QUERY_TIMEOUT':
                                message = "Query execution was interrupted.";
                                break;
                            case 'ECONNREFUSED':
                                message = "Database connection was refused.";
                                break;
                            case 'ETIMEDOUT':
                                message = "Database connection timed out.";
                                break;
                            case 'EHOSTUNREACH':
                                message = "Database host is unreachable.";
                                break;
                            case 'ENETUNREACH':
                                message = "Network is unreachable.";
                                break;
                            case 'ECONNRESET':
                                message = "Connection was reset.";
                                break;
                            case 'ENOTFOUND':
                                message = "Database host not found.";
                                break;
                            case 'ERR_INVALID_ARG_TYPE':
                                message = "Invalid argument type provided.";
                                break;
                            case 'ERR_INVALID_CALLBACK':
                                message = "Invalid callback function provided.";
                                break;
                            case 'ERR_HTTP_HEADERS_SENT':
                                message = "Cannot send headers after they are sent to the client.";
                                break;
                            default:
                                message = "An unexpected error occurred. Please try again later.";
                        }

                        return res.status(500).json({ ResponseCode: responseCode, message });
                    }

                    const token = jwt.sign(
                        { id: user.id, username: user.username },
                        process.env.ACCESS_TOKEN_SECRET,
                        { expiresIn: "1d" }
                    );

                    const allowedOrigins = JSON.parse(process.env.CORS_ORIGIN);
                    const origin = req.headers.origin;

                    if (allowedOrigins.includes(origin)) {
                        const domain = new URL(origin).hostname;

                        res.cookie('token', token, {
                            path: '/',
                            domain: domain,
                            // httpOnly: true, // Uncomment this if you want to prevent client-side scripts from accessing the cookie
                            secure: process.env.NODE_ENV === 'production',
                            maxAge: 24 * 15 * 60 * 1000,
                            sameSite: 'Strict',
                        });
                    }

                    return res.status(200).json({
                        ResponseCode: 1,
                        message: "User logged in successfully",
                        username: user.username
                    });

                });
            }
        });
    } catch (error) {
        return res.status(500).json({ ResponseCode: 0, message: "Something went wrong" });
    }
}

module.exports = { handleLogin };
