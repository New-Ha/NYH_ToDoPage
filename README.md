# NYH_ToDoPage
> ![Next JS](https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white) + ![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white) + ![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white) 를 사용하여 칸반형 To-Do List를 구현하는 과제

|과제 화면|
|---|
|![화면 기록 2025-02-25 오후 10 25 07](https://github.com/user-attachments/assets/f62ee45a-ec97-4274-992f-8a5db99131d6)|


## 🛠️ Stack
- 프레임워크 : Next.js(14.x.x 이상)
- 언어 : TypeScript
- 스타일링 : TailwindCSS(13.x.x)
- 데이터 관리: LocalStorage, SesstionStorage
- 라이브러리 : dnd-kit(drag & drop)
  
## 🎯요구사항 정의서
👉🏻 [요구사항 정의 노션 문서로 이동](https://bedecked-operation-4d1.notion.site/1a1eb405261e80b19508fe4b948bd454?v=1a1eb405261e801f83ac000ccdc12f76&pvs=4)


### 📁 파일 구조
```bash
/src
 ├── app/
 │    ├── (subjcet)/[id]/   # 각 주제별로 보여줄 페이지
 │    │    ├── page.tsx
 │    │    ├── SubjectClientPage.tsx
 │    ├──  search/   # 검색어 입력시 결과를 보여줄 페이지
 │    │    ├── page.tsx
 │    │    ├── SearchClientPage.tsx
 │    ├──  page.tsx/    # homePage로 주제가 없을 때 보여지는 페이지, 주제가 있으면 router로 이동시킴
 │    ├──  layout.tsx/ 
 │    
 ├── assets/   # icon svg 
 ├── components/   # UI 컴포넌트
 │    ├── board/   # 보드 관련 컴포넌트
 │    │    ├── Board.tsx
 │    │    ├── BoardList.tsx
 │    │    ├── AddBoardForm.tsx
 │    │
 │    ├── todo/    # 할 일 관련 컴포넌트
 │    │    ├── ToDoItem.tsx
 │    │    ├── ToDoList.tsx
 │    │    ├── AddToDoForm.tsx
 │    │
 │    ├── UI/     
 │    │    ├── Header.tsx
 │    │    ├── Icon.tsx
 │    │    ├── SearchBar.tsx
 │    
 ├── context/
 │    ├── SubjectContext.tsx    # 주제 관련 컨텍스트
 │    ├── BoardContext.tsx    # 보드 관련 컨텍스트
 │    ├── TodoContext.tsx    # 할 일 관련 컨텍스트
 │
```

### 프로젝트 실행
⚠️ 배포하지 않은 프로젝트이므로 다운로드 후에 실행해주세요.
```bash
$ npm install
$ npm run dev
```



