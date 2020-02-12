*Looking for a shareable component template? Go here --> [sveltejs/component-template](https://github.com/sveltejs/component-template)*

---

# svelte app

This is a project template for [Svelte](https://svelte.dev) apps. It lives at https://github.com/sveltejs/template.

To create a new project based on this template using [degit](https://github.com/Rich-Harris/degit):

```bash
npx degit sveltejs/template svelte-app
cd svelte-app
```

*Note that you will need to have [Node.js](https://nodejs.org) installed.*


## Get started

Install the dependencies...

```bash
cd svelte-app
npm install
```

...then start [Rollup](https://rollupjs.org):

```bash
npm run dev
```

Navigate to [localhost:5000](http://localhost:5000). You should see your app running. Edit a component file in `src`, save it, and reload the page to see your changes.

By default, the server will only respond to requests from localhost. To allow connections from other computers, edit the `sirv` commands in package.json to include the option `--host 0.0.0.0`.


## Building and running in production mode

To create an optimised version of the app:

```bash
npm run build
```

You can run the newly built app with `npm run start`. This uses [sirv](https://github.com/lukeed/sirv), which is included in your package.json's `dependencies` so that the app will work when you deploy to platforms like [Heroku](https://heroku.com).


## Single-page app mode

By default, sirv will only respond to requests that match files in `public`. This is to maximise compatibility with static fileservers, allowing you to deploy your app anywhere.

If you're building a single-page app (SPA) with multiple routes, sirv needs to be able to respond to requests for *any* path. You can make it so by editing the `"start"` command in package.json:

```js
"start": "sirv public --single"
```


## Deploying to the web

### With [now](https://zeit.co/now)

Install `now` if you haven't already:

```bash
npm install -g now
```

Then, from within your project folder:

```bash
cd public
now deploy --name my-project
```

As an alternative, use the [Now desktop client](https://zeit.co/download) and simply drag the unzipped project folder to the taskbar icon.

### With [surge](https://surge.sh/)

Install `surge` if you haven't already:

```bash
npm install -g surge
```

Then, from within your project folder:

```bash
npm run build
surge public my-project.surge.sh
```

---

🇰🇷

*공유 가능한 컴포넌트 템플릿을 찾고 있나요? 여기 참조! --> [sveltejs/component-template](https://github.com/sveltejs/component-template)*

---

# svelte app

[Svelte](https://svelte.dev) 앱을 위한 템플릿 프로젝트 입니다. 템플릿은 https://github.com/sveltejs/template 에 있습니다.
[degit](https://github.com/Rich-Harris/degit) 을 사용하여 템플릿 기반으로 새프로젝트를 만듭니다.

```bash
npx degit sveltejs/template svelte-app
cd svelte-app
```

*[Node.js](https://nodejs.org) Node.js 가 설치되어 있어야합니다.


## Get started

dependencies 를 설치해주세요.

```bash
cd svelte-app
npm install
```

...그리고 앱을 실행시킵니다. [Rollup](https://rollupjs.org):

```bash
npm run dev
```

[localhost:5000](http://localhost:5000) 으로 브라우저에서 접속하세요. 앱이 실행중인 것을 볼 수 있습니다. `src` 경로에서 컴포넌트 파일을 편집하고 저장 한 다음 페이지를 다시 로드하여 변경사항을 확인하세요.

기본적으로 서버는 localhost의 요청에만 응답합니다. 다른 컴퓨터에서 연결을 허용하려면 package.json에서`sirv` 명령을 편집하여`--host 0.0.0.0` 옵션을 포함하십시오.


## Building and running in production mode

앱의 최적화 된 버전을 만들려면

```bash
npm run build
```


`npm run start`로 새로 빌드 된 앱을 실행할 수 있습니다. 이것은 package.json의 '종속성'에 포함 된 [sirv] (https://github.com/lukeed/sirv)를 사용하므로 [Heroku] (https : //와 같은 플랫폼에 배포 할 때 앱이 작동합니다. heroku.com).


## Single-page app mode

기본적으로 sirv는`public`의 파일과 일치하는 요청에만 응답합니다. 이는 정적 파일 서버와의 호환성을 최대화하여 어디서나 앱을 배포 할 수 있도록하기위한 것입니다.

여러 경로로 단일 페이지 앱 (SPA)을 구축하는 경우 sirv는 *any* 경로 요청에 응답 할 수 있어야합니다. package.json에서` "start"`명령을 편집하면됩니다

```js
"start": "sirv public --single"
```


## Deploying to the web

### With [now](https://zeit.co/now)

`now` 를 설치하지 않았다면 설치하세요

```bash
npm install -g now
```

그리고, 당신의 프로젝트 폴더내에서 배포하세요

```bash
cd public
now deploy --name my-project
```

다른 방법으로 [Now desktop client] (https://zeit.co/download)를 사용하여 압축이 풀린 프로젝트 폴더를 작업 표시줄 아이콘으로 드래그하십시오.

### With [surge](https://surge.sh/)

`surge` 를 설치하지 않았다면 설치하세요

```bash
npm install -g surge
```

그리고, 당신의 프로젝트 폴더내에서 배포하세요

```bash
npm run build
surge public my-project.surge.sh
```



