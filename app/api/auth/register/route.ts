import User from "@/lib/models/user.model";
import { connectToDB } from "@/lib/mongoose";
import bcrypt from "bcryptjs"
import { NextResponse } from "next/server";


export const POST = async (request:Request) => {


    const {username,name,email,password} = await request.json();
    await connectToDB()

    const hashedPassword = await bcrypt.hash(password,5)

    const newUser = new User({
        username,
        name,
        email,
        password:hashedPassword
    })

    try {
        await newUser.save()
        return new NextResponse("user has been created",{
            status:201,
        })
    } catch (error:any) {
        console.log(error)
        return new NextResponse(error.message,{
            status:500,
        })
    }

}