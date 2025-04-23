'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

interface ActivityStep {
  id: string;
  title: string;
  timeMinutes: number;
}

interface DebateStage {
  id: string;
  title: string;
  activities: ActivityStep[];
  totalTime: number;
}

interface Scenario {
  id: string;
  title: string;
  totalTime: number;
  groupCount: number;
  stages: DebateStage[];
  createdAt: Date;
}

// 활동별 안내 및 발문 예시 데이터
const activityGuides: Record<string, { guide: string; examples: string[] }> = {
  '1-1': {
    guide: '사진/영상을 보고 &apos;왜&apos;, &apos;어떻게&apos; 질문을 자유롭게 만들어 발표해 보세요.',
    examples: [
      '이 장면에서 무엇이 보이나요?', 
      '어떤 생각이 드나요?', 
      '왜 이런 상황이 발생했을까요?'
    ]
  },
  '1-2': {
    guide: '토론 주제와 관련된 핵심 쟁점을 찾고, 모둠별로 의견을 나눠보세요.',
    examples: [
      '이 주제에서 가장 중요한 점은 무엇인가요?', 
      '찬성과 반대 입장에서 각각 어떤 주장을 할 수 있을까요?', 
      '양측의 주장이 충돌하는 지점은 어디인가요?'
    ]
  },
  '1-3': {
    guide: '모둠별로 주제에 관련된 자료를 조사하고 분석해보세요.',
    examples: [
      '이 자료는 어떤 의미를 가지고 있나요?', 
      '이 내용은 어느 입장을 지지하나요?', 
      '이 자료의 신뢰성은 어떤가요?'
    ]
  },
  '1-4': {
    guide: '조사한 내용을 바탕으로 모둠별 입론서를 작성해보세요.',
    examples: [
      '주장을 명확하게 작성했나요?', 
      '근거는 충분한가요?', 
      '예상되는 반론에 대한 대응도 생각해보세요.'
    ]
  },
  '2-1': {
    guide: '각 모둠에서 토론을 여는 주장을 발표해보세요.',
    examples: [
      '먼저 찬성 측 입론을 들어볼까요?', 
      '이제 반대 측 입론을 들어보겠습니다.', 
      '발표 시간은 각 팀당 3분입니다.'
    ]
  },
  '2-2': {
    guide: '모둠별로 상대편 주장에 대한 질문과 반박을 준비해보세요.',
    examples: [
      '상대 주장의 어떤 부분에 질문하고 싶나요?', 
      '가장 약해 보이는 논리는 무엇인가요?', 
      '어떤 증거가 부족해 보이나요?'
    ]
  },
  '2-3': {
    guide: '상대 모둠의 주장에 대해 질의하고 반박해보세요.',
    examples: [
      '질문은 상대방 발언의 약점을 드러내는 것이 좋습니다.', 
      '반박은 구체적인 근거와 함께 제시하세요.', 
      '상대의 발언을 경청하고 존중하는 태도를 유지해주세요.'
    ]
  },
  '2-4': {
    guide: '모둠별로 협의하고 자유토론을 진행합니다.',
    examples: [
      '모든 학생이 한 번씩 발언할 기회를 가져봅시다.', 
      '상대방 발언 중에는 메모하고, 차례가 오면 반박해보세요.', 
      '감정적인 발언보다는 논리적인 근거를 제시해주세요.'
    ]
  },
  '2-5': {
    guide: '다름을 인정하고 공존할 수 있는 방향으로 주장을 정리해보세요.',
    examples: [
      '상대 입장의 어떤 점을 이해하게 되었나요?', 
      '양측의 공통된 가치는 무엇인가요?', 
      '서로 다른 입장이 공존할 수 있는 방법은 무엇일까요?'
    ]
  },
  '3-1': {
    guide: '토론 후 자신의 생각이 어떻게 변화했는지 나눠보세요.',
    examples: [
      '토론 전과 후에 자신의 생각이 어떻게 바뀌었나요?', 
      '상대 입장에서 가장 설득력 있었던 주장은 무엇인가요?', 
      '이 토론을 통해 새롭게 알게 된 점은 무엇인가요?'
    ]
  },
  '3-2': {
    guide: '이 주제와 관련된 실천 방안이나 사회 참여 활동을 논의해보세요.',
    examples: [
      '우리 교실에서 실천할 수 있는 일은 무엇일까요?', 
      '학교나 지역사회에 제안할 수 있는 아이디어가 있나요?', 
      '이 문제 해결을 위해 우리가 할 수 있는 일은 무엇일까요?'
    ]
  }
};

function DebateGuide() {
  const searchParams = useSearchParams();
  const scenarioId = searchParams.get('id');
  
  const [scenario, setScenario] = useState<Scenario | null>(null);
  const [currentStageIndex, setCurrentStageIndex] = useState(0);
  const [currentActivityIndex, setCurrentActivityIndex] = useState(0);
  const [timer, setTimer] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [showTimerAlert, setShowTimerAlert] = useState(false);
  
  // 현재 활동 정보
  const currentStage = scenario?.stages[currentStageIndex];
  const currentActivity = currentStage?.activities[currentActivityIndex];
  const activityGuide = currentActivity ? activityGuides[currentActivity.id] : null;
  
  // 시나리오 로드
  useEffect(() => {
    if (!scenarioId) return;
    
    const savedScenarios = localStorage.getItem('debate-scenarios');
    if (savedScenarios) {
      try {
        const parsed = JSON.parse(savedScenarios);
        const found = parsed.find((s: Scenario) => s.id === scenarioId);
        if (found) {
          setScenario(found);
          // 타이머 초기값 설정
          if (found.stages[0]?.activities[0]) {
            setTimer(found.stages[0].activities[0].timeMinutes * 60);
          }
        }
      } catch (e) {
        console.error('Failed to parse saved scenarios', e);
      }
    }
  }, [scenarioId]);
  
  // 타이머 로직
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    
    if (isTimerRunning && timer > 0) {
      interval = setInterval(() => {
        setTimer(prev => {
          if (prev <= 1) {
            setIsTimerRunning(false);
            setShowTimerAlert(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else if (timer === 0 && interval) {
      clearInterval(interval);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isTimerRunning, timer]);
  
  const handleTimerControl = (action: 'start' | 'pause' | 'reset') => {
    if (action === 'start') {
      setIsTimerRunning(true);
      setShowTimerAlert(false);
    } else if (action === 'pause') {
      setIsTimerRunning(false);
    } else if (action === 'reset') {
      if (currentActivity) {
        setTimer(currentActivity.timeMinutes * 60);
        setIsTimerRunning(false);
        setShowTimerAlert(false);
      }
    }
  };
  
  const handleNextActivity = () => {
    if (!scenario) return;
    
    const nextActivityIndex = currentActivityIndex + 1;
    if (nextActivityIndex < currentStage!.activities.length) {
      // 다음 활동으로 이동
      setCurrentActivityIndex(nextActivityIndex);
      setTimer(currentStage!.activities[nextActivityIndex].timeMinutes * 60);
    } else {
      // 다음 단계로 이동
      const nextStageIndex = currentStageIndex + 1;
      if (nextStageIndex < scenario.stages.length) {
        setCurrentStageIndex(nextStageIndex);
        setCurrentActivityIndex(0);
        setTimer(scenario.stages[nextStageIndex].activities[0].timeMinutes * 60);
      } else {
        // 토론 종료
        alert('모든 토론 단계가 완료되었습니다!');
      }
    }
    
    setIsTimerRunning(false);
    setShowTimerAlert(false);
  };
  
  const handlePreviousActivity = () => {
    if (!scenario) return;
    
    const prevActivityIndex = currentActivityIndex - 1;
    if (prevActivityIndex >= 0) {
      // 이전 활동으로 이동
      setCurrentActivityIndex(prevActivityIndex);
      setTimer(currentStage!.activities[prevActivityIndex].timeMinutes * 60);
    } else {
      // 이전 단계로 이동
      const prevStageIndex = currentStageIndex - 1;
      if (prevStageIndex >= 0) {
        const prevStage = scenario.stages[prevStageIndex];
        const lastActivityIndex = prevStage.activities.length - 1;
        
        setCurrentStageIndex(prevStageIndex);
        setCurrentActivityIndex(lastActivityIndex);
        setTimer(prevStage.activities[lastActivityIndex].timeMinutes * 60);
      }
    }
    
    setIsTimerRunning(false);
    setShowTimerAlert(false);
  };
  
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  if (!scenario) {
    return (
      <div className="flex flex-col min-h-screen">
        <header className="bg-blue-700 text-white p-4">
          <div className="container mx-auto flex justify-between items-center">
            <h1 className="text-2xl font-bold">토론 튜터</h1>
            <nav>
              <ul className="flex space-x-4">
                <li><Link href="/" className="hover:underline">홈</Link></li>
              </ul>
            </nav>
          </div>
        </header>

        <main className="flex-grow container mx-auto p-4 md:p-6 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">시나리오를 찾을 수 없습니다.</h2>
            <p className="mb-6">시나리오가 존재하지 않거나 로드할 수 없습니다.</p>
            <Link href="/create-scenario" className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md transition-colors">
              시나리오 생성 페이지로 돌아가기
            </Link>
          </div>
        </main>

        <footer className="bg-gray-800 text-white py-6">
          <div className="container mx-auto px-4 text-center">
            <p>&copy; {new Date().getFullYear()} 토론 튜터. All rights reserved.</p>
          </div>
        </footer>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-blue-700 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">토론 튜터</h1>
          <div className="flex items-center space-x-4">
            <span className="text-xl font-semibold">{scenario.title}</span>
            <Link href="/create-scenario" className="text-white hover:underline">
              종료
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-grow container mx-auto p-4 md:p-6">
        <div className="grid md:grid-cols-4 gap-6">
          {/* 사이드바: 토론 진행 단계 */}
          <div className="md:col-span-1">
            <div className="bg-white p-4 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold mb-4 text-gray-800">토론 단계</h3>
              <div className="space-y-2">
                {scenario.stages.map((stage, stageIndex) => (
                  <div key={stage.id}>
                    <h4 className={`font-medium ${currentStageIndex === stageIndex ? 'text-blue-700' : 'text-gray-600'}`}>
                      {stage.title}
                    </h4>
                    <ul className="mt-1 ml-4 space-y-1">
                      {stage.activities.map((activity, activityIndex) => (
                        <li 
                          key={activity.id}
                          className={`text-sm py-1 px-2 rounded cursor-pointer
                            ${currentStageIndex === stageIndex && currentActivityIndex === activityIndex 
                              ? 'bg-blue-100 text-blue-800 font-medium' 
                              : 'text-gray-500 hover:bg-gray-100'}`}
                          onClick={() => {
                            setCurrentStageIndex(stageIndex);
                            setCurrentActivityIndex(activityIndex);
                            setTimer(activity.timeMinutes * 60);
                            setIsTimerRunning(false);
                            setShowTimerAlert(false);
                          }}
                        >
                          {activity.title} ({activity.timeMinutes}분)
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-white p-4 rounded-lg shadow-md mt-4">
              <h3 className="text-lg font-semibold mb-4 text-gray-800">자료 및 템플릿</h3>
              <ul className="space-y-2">
                <li>
                  <button 
                    onClick={() => window.open('/templates/rules.pdf', '_blank')}
                    className="w-full text-left px-3 py-2 bg-gray-50 hover:bg-gray-100 rounded-md text-sm text-gray-700"
                  >
                    토론 규칙/예절
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => window.open('/templates/argument-form.pdf', '_blank')}
                    className="w-full text-left px-3 py-2 bg-gray-50 hover:bg-gray-100 rounded-md text-sm text-gray-700"
                  >
                    입론서 양식
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => window.open('/templates/record-sheet.pdf', '_blank')}
                    className="w-full text-left px-3 py-2 bg-gray-50 hover:bg-gray-100 rounded-md text-sm text-gray-700"
                  >
                    토론 활동 기록지
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => window.open('/templates/reflection-questions.pdf', '_blank')}
                    className="w-full text-left px-3 py-2 bg-gray-50 hover:bg-gray-100 rounded-md text-sm text-gray-700"
                  >
                    성찰 질문 목록
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => window.open('/templates/follow-up-activities.pdf', '_blank')}
                    className="w-full text-left px-3 py-2 bg-gray-50 hover:bg-gray-100 rounded-md text-sm text-gray-700"
                  >
                    후속 활동 아이디어
                  </button>
                </li>
              </ul>
            </div>
          </div>

          {/* 메인 콘텐츠: 토론 진행 가이드 */}
          <div className="md:col-span-3">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">
                  현재 활동: {currentActivity?.title}
                </h2>
                <div className="text-xl font-mono">
                  <span className={`${showTimerAlert ? 'text-red-600 animate-pulse' : 'text-gray-700'}`}>
                    {formatTime(timer)}
                  </span>
                </div>
              </div>
              
              <div className="bg-blue-50 p-4 rounded-lg mb-6">
                <h3 className="text-lg font-medium text-blue-800 mb-2">활동 안내</h3>
                <p className="text-gray-700">{activityGuide?.guide}</p>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg mb-6">
                <h3 className="text-lg font-medium text-gray-800 mb-2">교사용 발문 예시</h3>
                <ul className="list-disc pl-5 space-y-2">
                  {activityGuide?.examples.map((example, index) => (
                    <li key={index} className="text-gray-700">{example}</li>
                  ))}
                </ul>
              </div>
              
              <div className="flex justify-between items-center mt-8">
                <div className="flex space-x-3">
                  <button
                    onClick={() => handleTimerControl(isTimerRunning ? 'pause' : 'start')}
                    className={`px-4 py-2 font-medium rounded-md transition-colors
                      ${isTimerRunning 
                        ? 'bg-yellow-500 hover:bg-yellow-600 text-white' 
                        : 'bg-green-600 hover:bg-green-700 text-white'}`}
                  >
                    {isTimerRunning ? '일시정지' : '시작'}
                  </button>
                  <button
                    onClick={() => handleTimerControl('reset')}
                    className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium rounded-md transition-colors"
                  >
                    리셋
                  </button>
                </div>
                
                <div className="flex space-x-3">
                  <button
                    onClick={handlePreviousActivity}
                    className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium rounded-md transition-colors"
                    disabled={currentStageIndex === 0 && currentActivityIndex === 0}
                  >
                    이전
                  </button>
                  <button
                    onClick={handleNextActivity}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md transition-colors"
                  >
                    다음
                  </button>
                </div>
              </div>
            </div>
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

export default function StartDebate() {
  return (
    <Suspense fallback={<div>로딩 중...</div>}>
      <DebateGuide />
    </Suspense>
  );
} 