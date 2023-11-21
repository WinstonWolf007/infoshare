export enum http_code {
    OK=200,
    BAD_REQ_STATUS=400,
    NO_FOUND=404,
    INTERN_ERROR=500
};

export function http_response(status_code: http_code, message: string): string {
    return JSON.stringify({"status": status_code, "msg": message});
};

interface http_response_struct {
    status: http_code,
    msg: string
};

export type http_type = http_response_struct;
