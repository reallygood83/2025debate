'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function DebatePractice() {
  const [topic, setTopic] = useState('');
  const [essayContent, setEssayContent] = useState('');
  const [feedback, setFeedback] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setFeedback('');
    
    try {
      // 실제 배포에서는 API 연결
      setTimeout(() => {
        setFeedback(`
          ### 논술 피드백

          #### 논리 구조
          - 서론에서 주제를 명확히 제시하고 있습니다.
          - 본론에서 논점을 순차적으로 전개하고 있으나, 2번째 단락에서 논리적 비약이 있습니다.
          - 결론이 본론의 내용을 잘 요약하고 있습니다.

          #### 표현력
          - 문장 구조가 다양하게 사용되었습니다.
          - 일부 표현이 반복되고 있어 다양한 어휘 사용을 권장합니다.

          #### 논증 분석
          - 주장을 뒷받침하는 근거가 구체적으로 제시되어 있습니다.
          - 상대 입장에 대한 고려가 부족합니다. 반론을 예상하고 이에 대응하는 논증을 추가하면 좋겠습니다.

          #### 개선 방향
          1. 두 번째 단락의 논리적 연결성을 강화하세요.
          2. 다양한 어휘를 활용하여 표현을 풍부하게 하세요.
          3. 반론에 대한 대응을 추가하세요.
        `);
        setIsLoading(false);
      }, 2000);
    } catch (error) {
      console.error('Error getting feedback:', error);
      setFeedback('피드백을 가져오는 중 오류가 발생했습니다. 다시 시도해주세요.');
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-blue-700 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">디베이트 튜터</h1>
          <nav>
            <ul className="flex space-x-4">
              <li><Link href="/" className="hover:underline">홈</Link></li>
              <li><Link href="/#features" className="hover:underline">기능</Link></li>
              <li><Link href="/#practice" className="hover:underline">연습하기</Link></li>
              <li><Link href="/#about" className="hover:underline">소개</Link></li>
            </ul>
          </nav>
        </div>
      </header>

      <main className="flex-grow container mx-auto p-4 md:p-6">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">논술 연습</h2>
          <p className="text-gray-600">원하는 주제에 대해 논술을 작성하고 AI의 피드백을 받아보세요.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="topic" className="block text-sm font-medium text-gray-700 mb-2">
                주제
              </label>
              <input
                type="text"
                id="topic"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="논술 주제를 입력하세요"
                required
              />
            </div>
            <div>
              <label htmlFor="essayContent" className="block text-sm font-medium text-gray-700 mb-2">
                논술 내용
              </label>
              <textarea
                id="essayContent"
                value={essayContent}
                onChange={(e) => setEssayContent(e.target.value)}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 h-64"
                placeholder="논술 내용을 작성하세요"
                required
              />
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-3 rounded-md font-medium text-white ${
                isLoading ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'
              }`}
            >
              {isLoading ? '분석 중...' : '피드백 받기'}
            </button>
          </form>

          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-4 text-gray-800">AI 피드백</h3>
            {feedback ? (
              <div className="prose max-w-none">
                <div className="whitespace-pre-line">{feedback}</div>
              </div>
            ) : (
              <p className="text-gray-500">
                {isLoading
                  ? '논술을 분석하는 중입니다...'
                  : '논술을 작성하고 제출하면 이곳에 AI 피드백이 표시됩니다.'}
              </p>
            )}
          </div>
        </div>
      </main>

      <footer className="bg-gray-800 text-white py-6 mt-auto">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; {new Date().getFullYear()} 디베이트 튜터. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
} 