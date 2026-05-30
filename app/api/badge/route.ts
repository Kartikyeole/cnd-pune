export const runtime = "nodejs";

import { NextRequest, NextResponse } from "next/server";
import satori from "satori";
import fs from "fs";
import path from "path";

export async function POST(req: NextRequest) {
    try {
        const { Resvg } = await import("@resvg/resvg-js");

        const body = await req.json();

        const name = body.name || "";
        const role = body.role || "";
        const photo = body.photo || null;

        console.log({
            name,
            role,
            photoExists: !!photo,
            photoPreview: photo?.substring?.(0, 50),
        });

        const regularFont = fs.readFileSync(
            path.join(process.cwd(), "public", "Inter-Regular.ttf")
        );

        const boldFont = fs.readFileSync(
            path.join(process.cwd(), "public", "Inter-Bold.ttf")
        );

        const bgBuffer = fs.readFileSync(
            path.join(process.cwd(), "public", "attending-event-blank.png")
        );

        const bgBase64 = bgBuffer.toString("base64");

        const svg = await satori(
            {
                type: "div",
                props: {
                    style: {
                        width: "1080px",
                        height: "1080px",
                        position: "relative",
                        display: "flex",
                        fontFamily: "Inter",
                    },

                    children: [
                        {
                            type: "img",
                            props: {
                                src: `data:image/png;base64,${bgBase64}`,
                                width: 1080,
                                height: 1080,
                            },
                        },

                        {
                            type: "div",
                            props: {
                                style: {
                                    position: "absolute",
                                    top: "521px",
                                    left: "234px",
                                    width: "600px",
                                    height: "210px",
                                    display: "flex",
                                    alignItems: "center",
                                },

                                children: [
                                    photo &&
                                        typeof photo === "string" &&
                                        photo.startsWith("data:image")
                                        ? {
                                            type: "img",
                                            props: {
                                                src: photo,
                                                width: 180,
                                                height: 180,
                                                style: {
                                                    objectFit: "cover",
                                                },
                                            },
                                        }
                                        : {
                                            type: "div",
                                            props: {
                                                style: {
                                                    width: "180px",
                                                    height: "180px",
                                                    backgroundColor: "#e5e7eb",
                                                    display: "flex",
                                                    justifyContent: "center",
                                                    alignItems: "center",
                                                    color: "#64748b",
                                                    fontSize: "20px",
                                                },
                                                children: "Photo",
                                            },
                                        },

                                    {
                                        type: "div",
                                        props: {
                                            style: {
                                                display: "flex",
                                                flexDirection: "column",
                                                marginLeft: "24px",
                                            },

                                            children: [
                                                {
                                                    type: "div",
                                                    props: {
                                                        children: name || "Your Name",
                                                        style: {
                                                            fontSize: "42px",
                                                            fontWeight: 700,
                                                            color: "#1a365d",
                                                            fontFamily: "Inter",
                                                        },
                                                    },
                                                },

                                                {
                                                    type: "div",
                                                    props: {
                                                        children: role || "Your Role / Company",
                                                        style: {
                                                            fontSize: "24px",
                                                            color: "#4a5568",
                                                            marginTop: "8px",
                                                            fontFamily: "Inter",
                                                        },
                                                    },
                                                },
                                            ],
                                        },
                                    },
                                ],
                            },
                        },
                    ],
                },
            } as any,
            {
                width: 1080,
                height: 1080,

                fonts: [
                    {
                        name: "Inter",
                        data: regularFont,
                        weight: 400,
                        style: "normal",
                    },
                    {
                        name: "Inter",
                        data: boldFont,
                        weight: 700,
                        style: "normal",
                    },
                ],
            }
        );

        const resvg = new Resvg(svg);

        const pngBuffer = resvg.render().asPng();

        return new NextResponse(new Uint8Array(pngBuffer), {
            headers: {
                "Content-Type": "image/png",
            },
        });
    } catch (error) {
        console.error("BADGE ERROR:", error);

        return NextResponse.json(
            {
                error: String(error),
            },
            { status: 500 }
        );
    }
}