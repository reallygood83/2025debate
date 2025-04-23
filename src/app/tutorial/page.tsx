import Link from 'next/link';

export default function Tutorial() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-blue-700 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">토론 튜터</h1>
          <nav>
            <ul className="flex space-x-4">
              <li><Link href="/" className="hover:underline">홈</Link></li>
              <li><Link href="/#features" className="hover:underline">기능</Link></li>
              <li><Link href="/#process" className="hover:underline">토론 모형</Link></li>
              <li><Link href="/#about" className="hover:underline">소개</Link></li>
            </ul>
          </nav>
        </div>
      </header>

      <main className="flex-grow container mx-auto p-4 md:p-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">토론 튜터 사용 방법</h2>
          <p className="text-gray-600">
            토론 튜터를 활용하여 효과적인 토론 수업을 진행하는 방법을 알아봅니다.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="mb-10 p-6 bg-white rounded-lg shadow-md">
            <h3 className="text-2xl font-bold mb-4 text-blue-700">1. 토론 시나리오 생성</h3>
            <p className="mb-4 text-gray-700">
              &apos;시나리오 만들기&apos; 버튼을 클릭하여 토론 주제와 수업 시간을 설정하고 시나리오를 생성합니다.
              경기초등토론교육모형 3단계를 기반으로 한 표준 시나리오 템플릿이 자동으로 생성됩니다.
            </p>
            <div className="bg-blue-50 p-4 rounded-md my-4">
              <h4 className="font-semibold text-blue-700 mb-2">시나리오 생성 단계</h4>
              <ol className="list-decimal pl-6 space-y-2">
                <li>토론 주제 입력 (예: &quot;초등학교 휴대폰 사용을 허용해야 한다&quot;)</li>
                <li>총 예상 시간 설정 (분 단위)</li>
                <li>모둠 수 선택 (선택사항)</li>
                <li>&apos;시나리오 생성&apos; 버튼 클릭</li>
                <li>생성된 시나리오 활동 시간 수정 (필요시)</li>
                <li>&apos;저장하기&apos; 버튼 클릭</li>
              </ol>
            </div>
            <div className="mt-3">
              <Link href="/create-scenario" className="text-blue-600 hover:underline font-medium">시나리오 생성 페이지로 이동 →</Link>
            </div>
          </div>

          <div className="mb-10 p-6 bg-white rounded-lg shadow-md">
            <h3 className="text-2xl font-bold mb-4 text-blue-700">2. 토론 진행하기</h3>
            <p className="mb-4 text-gray-700">
              생성된 시나리오를 선택하고 &apos;토론 시작하기&apos; 버튼을 클릭하면 AI 토론 가이드가 단계별로
              토론 진행을 안내합니다. 각 활동에 맞는 안내와 교사용 발문 예시가 제공됩니다.
            </p>
            <div className="space-y-4">
              <div>
                <h4 className="text-xl font-semibold mb-2 text-gray-800">토론 진행 화면 구성</h4>
                <ul className="list-disc pl-6 space-y-2">
                  <li>현재 단계/활동명 표시</li>
                  <li>활동 안내: 해당 활동의 목적과 진행 방법</li>
                  <li>교사용 발문 예시: 토론을 이끌어가는 데 도움이 되는 질문들</li>
                  <li>타이머: 각 활동에 배정된 시간 관리</li>
                </ul>
              </div>

              <div>
                <h4 className="text-xl font-semibold mb-2 text-gray-800">타이머 사용법</h4>
                <ul className="list-disc pl-6 space-y-1">
                  <li><span className="font-medium">시작</span>: 타이머를 시작합니다.</li>
                  <li><span className="font-medium">일시정지</span>: 타이머를 일시 중지합니다.</li>
                  <li><span className="font-medium">리셋</span>: 타이머를 현재 활동의 초기 시간으로 되돌립니다.</li>
                </ul>
              </div>

              <div>
                <h4 className="text-xl font-semibold mb-2 text-gray-800">활동 이동</h4>
                <ul className="list-disc pl-6 space-y-1">
                  <li><span className="font-medium">다음</span>: 다음 활동으로 이동합니다.</li>
                  <li><span className="font-medium">이전</span>: 이전 활동으로 돌아갑니다.</li>
                  <li><span className="font-medium">사이드바</span>: 왼쪽 사이드바에서 원하는 활동을 직접 클릭하여 이동할 수 있습니다.</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="mb-10 p-6 bg-white rounded-lg shadow-md">
            <h3 className="text-2xl font-bold mb-4 text-blue-700">3. 자료 및 템플릿 활용</h3>
            <p className="mb-4 text-gray-700">
              토론 진행 화면의 왼쪽 하단에서 다양한 자료와 템플릿을 확인하고 활용할 수 있습니다.
            </p>
            <div className="space-y-3">
              <div className="p-3 bg-gray-50 rounded-md">
                <h4 className="font-semibold text-gray-800">토론 규칙/예절</h4>
                <p className="text-gray-600">학생들에게 안내할 수 있는 기본적인 토론 규칙과 예절</p>
              </div>
              <div className="p-3 bg-gray-50 rounded-md">
                <h4 className="font-semibold text-gray-800">입론서 양식</h4>
                <p className="text-gray-600">모둠별로 주장과 근거를 정리할 수 있는 양식</p>
              </div>
              <div className="p-3 bg-gray-50 rounded-md">
                <h4 className="font-semibold text-gray-800">토론 활동 기록지</h4>
                <p className="text-gray-600">토론 내용을 기록하고 평가할 수 있는 기록지</p>
              </div>
              <div className="p-3 bg-gray-50 rounded-md">
                <h4 className="font-semibold text-gray-800">성찰 질문 목록</h4>
                <p className="text-gray-600">토론 후 학생들의 성찰을 돕는 질문 목록</p>
              </div>
              <div className="p-3 bg-gray-50 rounded-md">
                <h4 className="font-semibold text-gray-800">후속 활동 아이디어</h4>
                <p className="text-gray-600">토론 주제와 연계할 수 있는 후속 활동 제안</p>
              </div>
            </div>
          </div>

          <div className="mb-10 p-6 bg-white rounded-lg shadow-md">
            <h3 className="text-2xl font-bold mb-4 text-blue-700">4. 효과적인 활용 팁</h3>
            <ul className="list-disc pl-6 space-y-3">
              <li>
                <span className="font-medium">사전 준비</span>: 
                토론 주제에 맞는 참고 자료나 사진/영상을 미리 준비해두면 1단계 활동이 더 풍부해집니다.
              </li>
              <li>
                <span className="font-medium">시간 조정</span>: 
                학생들의 수준과 상황에 맞게 각 활동의 시간을 조정하세요. 활발한 토론이 이루어지고 있다면 유연하게 시간을 연장할 수 있습니다.
              </li>
              <li>
                <span className="font-medium">발문 활용</span>: 
                제공되는 발문 예시는 참고용입니다. 실제 수업 상황과 학생들의 반응에 맞게 응용하세요.
              </li>
              <li>
                <span className="font-medium">다양한 주제</span>: 
                학교생활, 사회 이슈, 윤리적 딜레마 등 다양한 주제로 토론을 진행해보세요.
              </li>
            </ul>
          </div>

          <div className="text-center mt-8">
            <Link href="/create-scenario" className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full shadow-lg transition duration-300">
              지금 바로 시작하기
            </Link>
          </div>
        </div>
      </main>

      <footer className="bg-gray-800 text-white py-6 mt-auto">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; {new Date().getFullYear()} 토론 튜터. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
} 