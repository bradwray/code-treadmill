[Code Treadmill](https://www.code-treadmill/) is a fitness-themed programming game that provides "workouts" containing a series of randomized code snippets for the user to solve. The user's speed and progress at solving these challenges is recorded and displayed throughout a workout. Each workout can also be turned into a multiplayer race that can be played across the web via web sockets.

## Contributing

Pull requests are welcome, especially ones that address open issues. If you'de like to contribute [workouts](https://github.com/bradwray/code-treadmill/tree/main/workouts), you'll see that the content property of each workout exercise is an encoded template to ensure test-retest randomness. Here are the meanings of the codes. When writing code for a workout's content, place them wherever you would place a value. 

| Placeholder | Description                            |
|-------------|----------------------------------------|
| ##          | Random integer between 1 and 7         |
| #-#         | Random integer between 8 and 16        |
| #.#         | Random float with two decimal places   |
| @@          | Random animal name                    |
| ^^          | Random human name                     |
| **          | Random boolean (true or false)        |
| $$          | Random adjective                      |
| ~~          | Random single character               |
| !!          | Random sentence                       |

Don't hesitate to contact me @bradwray if you have any ideas/questions.



## Getting Started

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.js`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.
