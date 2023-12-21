package service

type Response struct {
	Code int    `json:"code"`
	Msg  string `json:"msg"`
}

func GenResponse(code int, msg string) Response {
	return Response{
		code,
		msg,
	}
}
