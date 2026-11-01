/** 검사 세션을 여는 외부 검사 서버 주소. 배포 환경마다 VITE_ASSESSMENT_URL 로 지정한다. */
export const ASSESSMENT_URL = import.meta.env.VITE_ASSESSMENT_URL?.trim() || null
