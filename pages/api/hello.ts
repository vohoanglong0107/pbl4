// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  name: string
}

const datas = [{
  passage: "",
  question: "",
  answer: {}
}]

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if(req.method === "GET")
    res.status(200).json({ name: 'John Doe' })
  else if(req.method === "POST"){
    const passage = req.body.passage;
    const question = req.body.question;
    const answer = req.body.answer;
    const newTest = {
      passage: passage,
      question: question,
      answer: answer
    }
    datas.push(newTest)
    console.log(datas);
    res.status(201).json(newTest);
  }
}
