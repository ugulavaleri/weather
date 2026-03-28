module.exports = {
    apps: [
        {
            name: 'parser',
            cwd: '/var/www/weather/parser',
            script: 'venv/bin/python',
            args: 'app.py',
            env: { FLASK_DEBUG: 'false' }
        },
        {
            name: 'backend',
            cwd: '/var/www/weather/backend',
            script: 'php',
            args: 'artisan serve --host=127.0.0.1 --port=8080',
        },
        {
            name: 'next-kg',
            cwd: '/var/www/weather/frontend',
            script: 'node_modules/.bin/next',
            args: 'start',
            env: { PORT: 3001, NODE_ENV: 'production', NEXT_PUBLIC_COUNTRY: 'KG' }
        },
        {
            name: 'next-az',
            cwd: '/var/www/weather/frontend',
            script: 'node_modules/.bin/next',
            args: 'start',
            env: { PORT: 3002, NODE_ENV: 'production', NEXT_PUBLIC_COUNTRY: 'AZ' }
        },
        {
            name: 'next-tr',
            cwd: '/var/www/weather/frontend',
            script: 'node_modules/.bin/next',
            args: 'start',
            env: { PORT: 3003, NODE_ENV: 'production', NEXT_PUBLIC_COUNTRY: 'TR' }
        },
        {
            name: 'next-kz',
            cwd: '/var/www/weather/frontend',
            script: 'node_modules/.bin/next',
            args: 'start',
            env: { PORT: 3004, NODE_ENV: 'production', NEXT_PUBLIC_COUNTRY: 'KZ' }
        },
        {
            name: 'next-uz',
            cwd: '/var/www/weather/frontend',
            script: 'node_modules/.bin/next',
            args: 'start',
            env: { PORT: 3005, NODE_ENV: 'production', NEXT_PUBLIC_COUNTRY: 'UZ' }
        },
        {
            name: 'next-tm',
            cwd: '/var/www/weather/frontend',
            script: 'node_modules/.bin/next',
            args: 'start',
            env: { PORT: 3006, NODE_ENV: 'production', NEXT_PUBLIC_COUNTRY: 'TM' }
        },
        {
            name: 'next-tj',
            cwd: '/var/www/weather/frontend',
            script: 'node_modules/.bin/next',
            args: 'start',
            env: { PORT: 3007, NODE_ENV: 'production', NEXT_PUBLIC_COUNTRY: 'TJ' }
        },
    ]
}