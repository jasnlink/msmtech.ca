'use server'
import { cookies } from "next/headers";
import prisma from "./database";
import crypto from "crypto";
import { NextResponse } from "next/server";

type SessionId = string;

export async function getSessionId(): SessionId | undefined {
    const cookieStore = cookies();
    console.log(`getSessionId`)
    return cookieStore.get("session-id")?.value;
}

export async function setSessionId(sessionId: SessionId): void {
    const response = NextResponse.next()
    const cookieOptions = {
        name: "session-id",
        value: sessionId,
        maxAge: 604800,
    };

    cookieStore.set(cookieOptions;
    console.log(`sessionId`, {
        sessionId: sessionId
    })
}

export async function getSessionIdAndCreateIfMissing() {
    let sessionId = await getSessionId();
    if (!sessionId) {
        sessionId = crypto.randomUUID();
        await setSessionId(sessionId);
        // Create a new session in the database
        await prisma.session.create({
            data: {
                id: sessionId,
                // other session fields if necessary
            }
        });
    }
    console.log(`getSessionIdAndCreateIfMissing`, {
        sessionId: sessionId
    })
    return sessionId;
}

export async function getSessionKey(key: string, namespace: string = "") {
    const sessionId = getSessionId();
    if (!sessionId) {
        return null;
    }

    const sessionKeyValue = await prisma.sessionStore.findUnique({
        where: {
            key: `session-${namespace}-${sessionId}-${key}`,
        },
    });

    return sessionKeyValue ? JSON.parse(sessionKeyValue.value) : null;
}

export async function setSessionKey(key: string, value: string|{[key:string|number]:any}, namespace: string = "") {
    const sessionId = getSessionIdAndCreateIfMissing();

    return await prisma.sessionStore.upsert({
        where: {
            key: `session-${namespace}-${sessionId}-${key}`,
        },
        update: {
            value: JSON.stringify(value),
        },
        create: {
            key: `session-${namespace}-${sessionId}-${key}`,
            value: JSON.stringify(value),
        },
    });
}
