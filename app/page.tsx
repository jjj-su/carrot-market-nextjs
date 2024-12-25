import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center gap-10 py-10 px-6">
      <span className="text-4xl">🔥</span>
      <div className="flex flex-col items-center gap-3 w-full">
        <Link href="/create-account" className="primary-btn py-2.5 text-lg">
          시작하기
        </Link>
        <div className="flex gap-2">
          <span>이미 계정이 있나요?</span>
          <Link href="/log-in" className="hover:underline text-blue-600">
            로그인
          </Link>
        </div>
      </div>
    </div>
  );
}
