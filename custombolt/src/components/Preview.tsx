'use client'; // ✅ also required

type Props = {
    code: string;
};

export default function Preview({ code }: Props) {
    return (
        <iframe
            className="w-full h-full bg-white"
            srcDoc={code}
            sandbox="allow-scripts"
        />
    );
}
