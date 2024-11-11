interface ErrorResponse {
	message: string;
	typeError: string;
	code: number;
}

function AppError({ code, message, typeError }: ErrorResponse) {
    return {
        message,
        code,
        typeError
    }
}

export default AppError;
