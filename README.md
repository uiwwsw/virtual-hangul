[![Version](https://img.shields.io/badge/version-1.0.0–RC.1-orange)](https://github.com/uiwwsw/virtual-keyboard/releases)
[![License](https://img.shields.io/github/license/starfederation/datastar)](https://github.com/uiwwsw/virtual-keyboard/blob/main/LICENSE)
[![Stars](https://img.shields.io/github/stars/starfederation/datastar?style=flat)](https://github.com/uiwwsw/virtual-keyboard/stargazers)
# virtual-keyboard

[데모](https://composed-input-y46p.vercel.app/)

> 🧩 **커스텀 한글 입력을 위한 완전한 솔루션**  
> **Composition 오류 없는 입력 필드 + 가상 키보드**  
> 커스텀 디자인된 키보드 제공
> 키보드 충돌 없는 한글 UX를 웹에서 구현하세요.

---

## 설치

```bash
npm install @uiwwsw/virtual-keyboard
```

---

## 🥁 Why virtual-keyboard?

기존 웹 인풋에서는 한글 입력 시 `composition` 이벤트가 완전히 신뢰할 수 없고,  
특히 **크로스워드, 게임 UI, 커스텀 에디터, 모바일 웹앱** 등에서는  
❌ 네이티브 키보드와의 충돌  
❌ 예측 불가한 커서 이동  
❌ 조합 중인 한글 깨짐  
같은 문제들이 흔합니다.

`virtual-keyboard`은 이 문제를 단단하게 해결합니다.

---

## 🧩 What is it?

**`virtual-keyboard`은 다음 두 가지로 구성된 라이브러리입니다:**

### 1. 🧠 `전용 Input` —

- 커스텀 api 를 제공하고
- 버추얼 키보드가 네이티브처럼 작동하게 만드는 인풋
- 커스텀 키보드 제공(예 핸드폰번호 전용 키패드, 천자인등)

### 2. 🎹 `VirtualKeyboard` — 웹 전용 **가상 한글 키보드 UI**

- 모바일에서도 네이티브 키보드 차단 → **일관된 입력 UX 제공**
- `ComposedInput`과 자동 연동
- 가볍고 설치 없는 **웹 앱에 최적화된 키보드 솔루션**

---

## 🎯 Use Case

- 🔤 **크로스워드**, **퍼즐 게임**에서 정확한 글자 입력이 필요할 때
- 🧱 에디터, 드로잉 툴 등에서 **직접 만든 커서 시스템**을 쓰고 싶을 때
- 📱 **모바일 웹에서 키보드 UI를 커스터마이징** 하고 싶을 때
- 🌐 **입력기를 직접 제어하고 싶은 다국어 웹앱**

---

## 🚧 Coming Soon...

- 조합 상태 시각화 (`onComposeUpdate`)
- 커스텀 키보드 레이아웃 지원
- `<textarea>` 유사 인터페이스 확장

---

## 📌 요약하면

> `virtual-keyboard`은 단순한 인풋이 아닙니다.
>
> 🧩 **완전 제어 가능한 한글 입력기 + 키보드 시스템**입니다.

## Star History

[![Star History Chart](https://api.star-history.com/svg?repos=uiwwsw/virtual-keyboard&type=Date)](https://www.star-history.com/#uiwwsw/virtual-keyboard&Date)
