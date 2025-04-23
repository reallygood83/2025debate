import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-blue-700 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">토론 튜터</h1>
          <nav>
            <ul className="flex space-x-4">
              <li><Link href="/" className="hover:underline">홈</Link></li>
              <li><Link href="#features" className="hover:underline">기능</Link></li>
              <li><Link href="#process" className="hover:underline">토론 모형</Link></li>
              <li><Link href="#about" className="hover:underline">소개</Link></li>
            </ul>
          </nav>
        </div>
      </header>

      <main className="flex-grow">
        <section className="py-20 bg-gradient-to-b from-blue-50 to-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold mb-6 text-blue-800">AI 기반 초등 토론 수업 지원 도구</h2>
            <p className="text-xl mb-10 max-w-3xl mx-auto text-gray-600">
              &apos;다름과 공존하는 경기초등토론교육모형&apos;에 기반하여 토론 수업을 효과적으로 준비하고 진행할 수 있도록 도와주는 AI 토론 가이드입니다.
            </p>
            <div className="flex gap-4 justify-center">
              <Link href="/create-scenario" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full shadow-lg transition duration-300">
                시나리오 만들기
              </Link>
              <Link href="/tutorial" className="bg-white border border-blue-600 text-blue-600 hover:bg-blue-50 font-bold py-3 px-8 rounded-full shadow-lg transition duration-300">
                사용 방법 보기
              </Link>
            </div>
          </div>
        </section>

        <section id="features" className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-center text-gray-800">주요 기능</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="p-6 border rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <h3 className="text-xl font-semibold mb-3 text-blue-700">토론 시나리오 생성</h3>
                <p className="text-gray-600">경기초등토론교육모형 3단계 기반의 표준 시나리오 템플릿을 자동으로 생성하고 관리할 수 있습니다.</p>
              </div>
              <div className="p-6 border rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <h3 className="text-xl font-semibold mb-3 text-blue-700">AI 토론 가이드</h3>
                <p className="text-gray-600">AI가 토론의 절차적 흐름을 안내하는 가이드/사회자 역할을 수행하며 교사의 수업 진행을 돕습니다.</p>
              </div>
              <div className="p-6 border rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <h3 className="text-xl font-semibold mb-3 text-blue-700">토론 자료 및 템플릿</h3>
                <p className="text-gray-600">토론 규칙, 입론서 양식, 활동 기록지 등 수업에 필요한 기본 자료와 템플릿을 제공합니다.</p>
              </div>
            </div>
          </div>
        </section>

        <section id="process" className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">다름과 공존하는 경기초등토론교육모형</h2>
            <div className="max-w-4xl mx-auto">
              <div className="bg-white p-6 rounded-lg shadow-md mb-6">
                <h3 className="text-xl font-semibold mb-3 text-blue-700">1단계: 다름과 마주하기</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>질문으로 논제 만나기</li>
                  <li>핵심 쟁점 찾기</li>
                  <li>자료 조사/분석</li>
                  <li>입론서 쓰기</li>
                </ul>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md mb-6">
                <h3 className="text-xl font-semibold mb-3 text-blue-700">2단계: 다름을 이해하기</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>토론 여는 주장하기</li>
                  <li>협의 시간</li>
                  <li>질의 및 반박하기</li>
                  <li>협의 및 자유토론 시간</li>
                  <li>공존을 향한 주장하기</li>
                </ul>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-3 text-blue-700">3단계: 다름과 공존하기</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>토론 후 생각 나누기</li>
                  <li>성찰/사회 참여 활동 안내</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section id="about" className="py-16 bg-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6 text-gray-800">토론 튜터 소개</h2>
            <p className="text-lg max-w-3xl mx-auto text-gray-600">
              토론 튜터는 초등학교 교사가 &apos;다름과 공존하는 경기초등토론교육모형&apos;에 기반한 토론 수업을 효과적으로
              준비하고 진행할 수 있도록 돕는 AI 토론 수업 지원 도구입니다. AI가 토론의 절차적 흐름을 안내하는 가이드/사회자
              역할을 수행하여 교사의 부담을 줄이고 수업의 질을 높이는 것을 목표로 합니다.
            </p>
            <div className="mt-8">
              <Link href="/about-us" className="text-blue-600 hover:underline font-medium">자세히 알아보기 →</Link>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-gray-800 text-white py-6">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; {new Date().getFullYear()} 토론 튜터. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
