const Connection = require("../Connection");
const asyncHandler = require("../utils/asynchandler");

const CompleteToken = asyncHandler(async (req, res) => {

    const { token_no } = req.body;

    if (!token_no) {
        return res.status(400).json({ ResponseCode: 0, message: "Token no is required, try again" });
    }

    Connection.query("CALL SPcompletetoken(?)", [token_no], (error, results) => {
        if (error) {
            let message = "Error completing token, Try Again!!!";
            let responseCode = 0;

            switch (error.code) {
                // Database errors
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

                // Network errors
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

                // Application errors
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

        return res.status(200).json({ message: results[0][0] });
    });
});

module.exports = { CompleteToken };
