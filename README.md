# Mindscale

## 개발

```sh
npm install
cp .env.example .env   # VITE_ASSESSMENT_URL 설정
npm run dev
```

## 검사

```sh
npm run lint
npm run build
```

## 배포

`main` 에 push 하면 GitHub Actions 가 GitHub Pages 로 배포한다.

- Settings → Pages → Source: **GitHub Actions**
- Settings → Secrets and variables → Actions → Variables: `VITE_ASSESSMENT_URL`
