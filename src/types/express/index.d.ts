// src/types/express/index.d.ts
import * as express from 'express';

declare global {
    namespace Express {
        interface Request {
            user?: {
                id: number;
                email: string;
                // เพิ่มเติม fields อื่น ๆ ที่ต้องการ
            }
        }
    }
}
