//统一响应对象

export class ResponseDto<T> {
    constructor(
        public success: boolean,
        public data: T | null,
        public message?: string,
        public errorCode?: number
    ) {}
}