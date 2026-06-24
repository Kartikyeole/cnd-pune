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
        const designation = body.designation || "";
        const company = body.company || "";
        const photo = body.photo || null;
        const zoom = typeof body.zoom === "number" ? body.zoom : 120;
        const posX = typeof body.posX === "number" ? body.posX : 50;
        const posY = typeof body.posY === "number" ? body.posY : 50;

        console.log({
            name,
            designation,
            company,
            photoExists: !!photo,
            photoPreview: photo?.substring?.(0, 50),
            zoom,
            posX,
            posY,
        });

        const regularFont = fs.readFileSync(
            path.join(process.cwd(), "public", "Inter-Regular.ttf")
        );

        const boldFont = fs.readFileSync(
            path.join(process.cwd(), "public", "Inter-Bold.ttf")
        );

        const bgBuffer = fs.readFileSync(
            path.join(process.cwd(), "public", "GemmaMeetup.png")
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
                                    top: "500px",
                                    left: "600px",
                                    width: "600px",
                                    height: "480px",
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center",
                                    justifyContent: "flex-start",
                                },

                                children: [
                                    {
                                        type: "div",
                                        props: {
                                            style: {
                                                width: "190px",
                                                height: "190px",
                                                borderRadius: "24px",
                                                padding: "3px",
                                                backgroundImage: "linear-gradient(to top right, #4285f4, #ea4335, #fbbc05, #34a853)",
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "center",
                                                flexShrink: 0,
                                            },
                                            children: [
                                                {
                                                    type: "div",
                                                    props: {
                                                        style: {
                                                            width: "100%",
                                                            height: "100%",
                                                            borderRadius: "21px",
                                                            overflow: "hidden",
                                                            position: "relative",
                                                            display: "flex",
                                                            backgroundColor: "#cbd5e1",
                                                        },
                                                        children: [
                                                            photo &&
                                                            typeof photo === "string" &&
                                                            photo.startsWith("data:image")
                                                            ? {
                                                                type: "img",
                                                                props: {
                                                                    src: photo,
                                                                    style: {
                                                                        position: "absolute",
                                                                        width: `${zoom}%`,
                                                                        height: `${zoom}%`,
                                                                        left: `-${(zoom - 100) * (posX / 100)}%`,
                                                                        top: `-${(zoom - 100) * (posY / 100)}%`,
                                                                        objectFit: "cover",
                                                                    },
                                                                },
                                                            }
                                                            : {
                                                                type: "div",
                                                                props: {
                                                                    style: {
                                                                        width: "100%",
                                                                        height: "100%",
                                                                        backgroundColor: "#e5e7eb",
                                                                        display: "flex",
                                                                        justifyContent: "center",
                                                                        alignItems: "center",
                                                                        color: "#64748b",
                                                                        fontSize: "20px",
                                                                    },
                                                                    children: "Photo",
                                                                },
                                                            }
                                                        ]
                                                    }
                                                }
                                            ]
                                        }
                                    },

                                    {
                                        type: "div",
                                        props: {
                                            style: {
                                                display: "flex",
                                                flexDirection: "column",
                                                alignItems: "center",
                                                marginTop: "20px",
                                                width: "100%",
                                            },

                                            children: [
                                                {
                                                    type: "div",
                                                    props: {
                                                        children: name || "Your Name",
                                                        style: {
                                                            fontSize: "36px",
                                                            fontWeight: 900,
                                                            color: "#0f172a",
                                                            fontFamily: "Inter",
                                                            textAlign: "center",
                                                        },
                                                    },
                                                },

                                                {
                                                    type: "div",
                                                    props: {
                                                        children: designation || "Your Designation",
                                                        style: {
                                                            fontSize: "20px",
                                                            fontWeight: 700,
                                                            color: "#1a73e8",
                                                            marginTop: "6px",
                                                            fontFamily: "Inter",
                                                            textAlign: "center",
                                                        },
                                                    },
                                                },

                                                {
                                                    type: "div",
                                                    props: {
                                                        children: company || "Your Company Name",
                                                        style: {
                                                            fontSize: "18px",
                                                            fontWeight: 600,
                                                            color: "#64748b",
                                                            marginTop: "4px",
                                                            fontFamily: "Inter",
                                                            textAlign: "center",
                                                        },
                                                    },
                                                },

                                                {
                                                    type: "div",
                                                    props: {
                                                        style: {
                                                            display: "flex",
                                                            height: "4px",
                                                            width: "140px",
                                                            marginTop: "16px",
                                                            borderRadius: "9999px",
                                                            overflow: "hidden",
                                                        },
                                                        children: [
                                                            {
                                                                type: "div",
                                                                props: {
                                                                    style: { width: "25%", height: "100%", backgroundColor: "#4285f4" }
                                                                }
                                                            },
                                                            {
                                                                type: "div",
                                                                props: {
                                                                    style: { width: "25%", height: "100%", backgroundColor: "#ea4335" }
                                                                }
                                                            },
                                                            {
                                                                type: "div",
                                                                props: {
                                                                    style: { width: "25%", height: "100%", backgroundColor: "#fbbc05" }
                                                                }
                                                            },
                                                            {
                                                                type: "div",
                                                                props: {
                                                                    style: { width: "25%", height: "100%", backgroundColor: "#34a853" }
                                                                }
                                                            }
                                                        ]
                                                    }
                                                }
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