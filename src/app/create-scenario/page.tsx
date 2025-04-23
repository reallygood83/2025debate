'use client';

import { useState, useEffect } from 'react';
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

export default function CreateScenario() {
  const [topic, setTopic] = useState('');
  const [totalTime, setTotalTime] = useState(60);
  const [groupCount, setGroupCount] = useState(4);
  const [scenarios, setScenarios] = useState<Scenario[]>([]);
  const [generatedScenario, setGeneratedScenario] = useState<Scenario | null>(null);
  
  // 브라우저에서만 실행
  useEffect(() => {
    const savedScenarios = localStorage.getItem('debate-scenarios');
    if (savedScenarios) {
      try {
        const parsed = JSON.parse(savedScenarios);
        setScenarios(parsed);
      } catch (e) {
        console.error('Failed to parse saved scenarios', e);
      }
    }
  }, []);

  const saveScenario = (scenario: Scenario) => {
    const updatedScenarios = [...scenarios, scenario];
    setScenarios(updatedScenarios);
    localStorage.setItem('debate-scenarios', JSON.stringify(updatedScenarios));
  };

  const generateStandardTemplate = () => {
    if (!topic || totalTime <= 0) {
      alert('주제와 전체 시간을 입력해주세요.');
      return;
    }
    
    // 각 단계별 시간 비율 계산 (1단계: 30%, 2단계: 50%, 3단계: 20%)
    const stage1Time = Math.round(totalTime * 0.3);
    const stage2Time = Math.round(totalTime * 0.5);
    const stage3Time = totalTime - stage1Time - stage2Time;
    
    const newScenario: Scenario = {
      id: Date.now().toString(),
      title: topic,
      totalTime: totalTime,
      groupCount: groupCount,
      stages: [
        {
          id: 'stage-1',
          title: '1단계: 다름과 마주하기',
          totalTime: stage1Time,
          activities: [
            { id: '1-1', title: '질문으로 논제 만나기', timeMinutes: Math.round(stage1Time * 0.2) },
            { id: '1-2', title: '핵심 쟁점 찾기', timeMinutes: Math.round(stage1Time * 0.2) },
            { id: '1-3', title: '자료 조사/분석', timeMinutes: Math.round(stage1Time * 0.3) },
            { id: '1-4', title: '입론서 쓰기', timeMinutes: Math.round(stage1Time * 0.3) }
          ]
        },
        {
          id: 'stage-2',
          title: '2단계: 다름을 이해하기',
          totalTime: stage2Time,
          activities: [
            { id: '2-1', title: '토론 여는 주장하기', timeMinutes: Math.round(stage2Time * 0.2) },
            { id: '2-2', title: '협의 시간', timeMinutes: Math.round(stage2Time * 0.1) },
            { id: '2-3', title: '질의 및 반박하기', timeMinutes: Math.round(stage2Time * 0.3) },
            { id: '2-4', title: '협의 및 자유토론 시간', timeMinutes: Math.round(stage2Time * 0.2) },
            { id: '2-5', title: '공존을 향한 주장하기', timeMinutes: Math.round(stage2Time * 0.2) }
          ]
        },
        {
          id: 'stage-3',
          title: '3단계: 다름과 공존하기',
          totalTime: stage3Time,
          activities: [
            { id: '3-1', title: '토론 후 생각 나누기', timeMinutes: Math.round(stage3Time * 0.6) },
            { id: '3-2', title: '성찰/사회 참여 활동 안내', timeMinutes: Math.round(stage3Time * 0.4) }
          ]
        }
      ],
      createdAt: new Date()
    };
    
    setGeneratedScenario(newScenario);
  };

  const handleSaveScenario = () => {
    if (generatedScenario) {
      saveScenario(generatedScenario);
      alert('시나리오가 저장되었습니다.');
    }
  };

  const handleActivityTimeChange = (stageIndex: number, activityIndex: number, newTime: number) => {
    if (!generatedScenario) return;
    
    const updatedScenario = {...generatedScenario};
    updatedScenario.stages[stageIndex].activities[activityIndex].timeMinutes = newTime;
    
    // 단계별 총 시간 재계산
    updatedScenario.stages[stageIndex].totalTime = updatedScenario.stages[stageIndex].activities.reduce(
      (sum, activity) => sum + activity.timeMinutes, 0
    );
    
    setGeneratedScenario(updatedScenario);
  };
  
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

      <main className="flex-grow container mx-auto p-4 md:p-6">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">토론 시나리오 만들기</h2>
          <p className="text-gray-600">경기초등토론교육모형에 기반한 토론 시나리오를 생성하고 관리할 수 있습니다.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-1">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4 text-gray-800">시나리오 정보 입력</h3>
              <form className="space-y-4">
                <div>
                  <label htmlFor="topic" className="block text-sm font-medium text-gray-700 mb-1">
                    토론 주제
                  </label>
                  <input
                    type="text"
                    id="topic"
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="예) 초등학교 휴대폰 사용을 허용해야 한다"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="totalTime" className="block text-sm font-medium text-gray-700 mb-1">
                    총 예상 시간 (분)
                  </label>
                  <input
                    type="number"
                    id="totalTime"
                    value={totalTime}
                    onChange={(e) => setTotalTime(Number(e.target.value))}
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    min="15"
                    max="180"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="groupCount" className="block text-sm font-medium text-gray-700 mb-1">
                    모둠 수 (선택사항)
                  </label>
                  <input
                    type="number"
                    id="groupCount"
                    value={groupCount}
                    onChange={(e) => setGroupCount(Number(e.target.value))}
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    min="2"
                    max="10"
                  />
                </div>
                <button
                  type="button"
                  onClick={generateStandardTemplate}
                  className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md transition-colors"
                >
                  시나리오 생성
                </button>
              </form>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md mt-6">
              <h3 className="text-xl font-semibold mb-4 text-gray-800">저장된 시나리오</h3>
              {scenarios.length > 0 ? (
                <ul className="space-y-2">
                  {scenarios.map((scenario) => (
                    <li key={scenario.id} className="p-3 bg-gray-50 rounded-md hover:bg-gray-100">
                      <Link href={`/scenario/${scenario.id}`} className="block">
                        <span className="font-medium">{scenario.title}</span>
                        <span className="block text-sm text-gray-500">총 {scenario.totalTime}분 / {new Date(scenario.createdAt).toLocaleDateString()}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500 text-center py-4">저장된 시나리오가 없습니다.</p>
              )}
            </div>
          </div>
          
          <div className="md:col-span-2">
            {generatedScenario ? (
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-semibold text-gray-800">시나리오: {generatedScenario.title}</h3>
                  <button
                    onClick={handleSaveScenario}
                    className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-medium rounded-md transition-colors"
                  >
                    저장하기
                  </button>
                </div>
                
                <div className="space-y-6">
                  {generatedScenario.stages.map((stage, stageIndex) => (
                    <div key={stage.id} className="border-t pt-4">
                      <h4 className="text-lg font-semibold mb-2 text-blue-700">{stage.title} (총 {stage.totalTime}분)</h4>
                      <ul className="space-y-3">
                        {stage.activities.map((activity, activityIndex) => (
                          <li key={activity.id} className="flex items-center gap-3">
                            <span className="flex-grow">{activity.id}. {activity.title}</span>
                            <div className="flex items-center gap-2">
                              <input
                                type="number"
                                value={activity.timeMinutes}
                                onChange={(e) => handleActivityTimeChange(stageIndex, activityIndex, Number(e.target.value))}
                                className="w-16 px-2 py-1 border rounded-md text-center"
                                min="1"
                                max="60"
                              />
                              <span className="text-sm">분</span>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>

                <div className="mt-6 flex justify-end">
                  <Link 
                    href={`/start-debate?id=${generatedScenario.id}`} 
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md transition-colors"
                  >
                    토론 시작하기
                  </Link>
                </div>
              </div>
            ) : (
              <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center justify-center min-h-[400px]">
                <p className="text-gray-500 mb-4 text-center">
                  왼쪽에서 토론 주제와 예상 시간을 입력하고 시나리오 생성 버튼을 클릭하면<br />
                  경기초등토론교육모형 기반의 표준 시나리오가 이곳에 표시됩니다.
                </p>
                <div className="flex flex-col items-center">
                  <p className="text-sm text-gray-400 mb-2">시나리오 생성 예시:</p>
                  <ul className="text-sm text-gray-400 list-disc pl-5">
                    <li>주제: 초등학교 휴대폰 사용을 허용해야 한다</li>
                    <li>총 시간: 60분</li>
                    <li>모둠 수: 4팀</li>
                  </ul>
                </div>
              </div>
            )}
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