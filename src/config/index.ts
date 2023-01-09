import dotenv from 'dotenv'

process.env.NODE_ENV = process.env.NODE_ENV || 'development'
dotenv.config()

export const config = {
    port: Number(process.env.PORT || 3000),
    system: {
        defaultQueryPageSize: 10
    }
}
