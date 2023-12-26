package service

type IResponse interface {
	Virtual()
}

type Response struct {
	Code int    `json:"code"`
	Msg  string `json:"msg"`
}

func (r Response) Virtual() {
}

func GenResponse(code int, msg string) Response {
	return Response{
		code,
		msg,
	}
}
