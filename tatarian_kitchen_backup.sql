--
-- PostgreSQL database dump
--

\restrict sexgw8Qnl5c6paJKGodBDu5Kyy8iKYQoLYuXJA1q6LlObqI8BIN98GDL5dHbgwu

-- Dumped from database version 16.10 (Ubuntu 16.10-0ubuntu0.24.04.1)
-- Dumped by pg_dump version 16.10 (Ubuntu 16.10-0ubuntu0.24.04.1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: Category; Type: TYPE; Schema: public; Owner: myuser
--

CREATE TYPE public."Category" AS ENUM (
    'VEGETABLES',
    'FRUITS',
    'MEAT',
    'DAIRY',
    'SPICES',
    'OTHER'
);


ALTER TYPE public."Category" OWNER TO myuser;

--
-- Name: Unit; Type: TYPE; Schema: public; Owner: myuser
--

CREATE TYPE public."Unit" AS ENUM (
    'GRAMS',
    'KILOGRAMS',
    'LITERS',
    'MILLILITERS',
    'PIECES'
);


ALTER TYPE public."Unit" OWNER TO myuser;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: _prisma_migrations; Type: TABLE; Schema: public; Owner: myuser
--

CREATE TABLE public._prisma_migrations (
    id character varying(36) NOT NULL,
    checksum character varying(64) NOT NULL,
    finished_at timestamp with time zone,
    migration_name character varying(255) NOT NULL,
    logs text,
    rolled_back_at timestamp with time zone,
    started_at timestamp with time zone DEFAULT now() NOT NULL,
    applied_steps_count integer DEFAULT 0 NOT NULL
);


ALTER TABLE public._prisma_migrations OWNER TO myuser;

--
-- Name: accounts; Type: TABLE; Schema: public; Owner: myuser
--

CREATE TABLE public.accounts (
    id text NOT NULL,
    user_id text NOT NULL,
    type text NOT NULL,
    provider text NOT NULL,
    provider_account_id text NOT NULL,
    refresh_token text,
    access_token text,
    expires_at integer,
    token_type text,
    scope text,
    id_token text,
    session_state text
);


ALTER TABLE public.accounts OWNER TO myuser;

--
-- Name: ingredients; Type: TABLE; Schema: public; Owner: myuser
--

CREATE TABLE public.ingredients (
    id text NOT NULL,
    name text NOT NULL,
    category public."Category" NOT NULL,
    unit public."Unit" NOT NULL,
    "pricePerUnit" double precision,
    description text,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(3) without time zone NOT NULL
);


ALTER TABLE public.ingredients OWNER TO myuser;

--
-- Name: recipe_ingredient; Type: TABLE; Schema: public; Owner: myuser
--

CREATE TABLE public.recipe_ingredient (
    id text NOT NULL,
    "recipeId" text NOT NULL,
    "ingredientId" text NOT NULL,
    quantity double precision NOT NULL
);


ALTER TABLE public.recipe_ingredient OWNER TO myuser;

--
-- Name: recipes; Type: TABLE; Schema: public; Owner: myuser
--

CREATE TABLE public.recipes (
    id text NOT NULL,
    name text NOT NULL,
    description text NOT NULL,
    image_url text,
    "userId" text
);


ALTER TABLE public.recipes OWNER TO myuser;

--
-- Name: sessions; Type: TABLE; Schema: public; Owner: myuser
--

CREATE TABLE public.sessions (
    id text NOT NULL,
    session_token text NOT NULL,
    user_id text NOT NULL,
    expires timestamp(3) without time zone NOT NULL
);


ALTER TABLE public.sessions OWNER TO myuser;

--
-- Name: users; Type: TABLE; Schema: public; Owner: myuser
--

CREATE TABLE public.users (
    id text NOT NULL,
    email text NOT NULL,
    password text NOT NULL,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(3) without time zone NOT NULL
);


ALTER TABLE public.users OWNER TO myuser;

--
-- Name: verification_tokens; Type: TABLE; Schema: public; Owner: myuser
--

CREATE TABLE public.verification_tokens (
    identifier text NOT NULL,
    token text NOT NULL,
    expires timestamp(3) without time zone NOT NULL
);


ALTER TABLE public.verification_tokens OWNER TO myuser;

--
-- Data for Name: _prisma_migrations; Type: TABLE DATA; Schema: public; Owner: myuser
--

COPY public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) FROM stdin;
e8d9ba86-8715-46a3-8ce4-4d14d63408b9	798140f7accfeaa048842fa3f6cc3d2e4c96da115dc061c8abdcd877e39165c3	2025-08-27 20:04:20.892672+10	20250827100420_init	\N	\N	2025-08-27 20:04:20.861417+10	1
\.


--
-- Data for Name: accounts; Type: TABLE DATA; Schema: public; Owner: myuser
--

COPY public.accounts (id, user_id, type, provider, provider_account_id, refresh_token, access_token, expires_at, token_type, scope, id_token, session_state) FROM stdin;
\.


--
-- Data for Name: ingredients; Type: TABLE DATA; Schema: public; Owner: myuser
--

COPY public.ingredients (id, name, category, unit, "pricePerUnit", description, created_at, updated_at) FROM stdin;
caec2888-9a95-49dd-aad4-5ff979835c4b	картошка	VEGETABLES	KILOGRAMS	600		2025-09-01 16:47:38.216	2025-09-01 16:47:38.216
ce7c6b7b-ff2e-45e0-8b97-6bd900ae9f9c	огурец	VEGETABLES	PIECES	40		2025-09-02 15:49:59.796	2025-09-02 15:49:59.796
cdeaedee-3104-4d10-b13a-03c094e7a10c	Творог	DAIRY	GRAMS	300		2025-09-17 11:31:19.703	2025-09-17 11:31:19.703
a687b893-025d-4c83-9199-89c51680b247	Куриное яйцо	OTHER	PIECES	30		2025-09-17 11:31:53.141	2025-09-17 11:31:53.141
8aa0f13d-4b79-47bc-a72d-909f1b7499c0	Пшеничная мука 	SPICES	GRAMS	30		2025-09-17 11:32:25.951	2025-09-17 11:32:25.951
687ee58c-9c24-481c-a37e-5abb10e2105b	Подсолнечное масло	OTHER	LITERS	46		2025-09-17 11:32:56.353	2025-09-17 11:32:56.353
8c26bfb1-975f-428b-af4b-8c7a8220f7fd	Спагетти 	OTHER	GRAMS	400		2025-09-19 13:04:34.146	2025-09-19 13:04:34.146
74dcb533-a0ca-43e5-bb96-d5fa8d514aef	Сливочное масло	DAIRY	GRAMS	300		2025-09-19 13:04:54.835	2025-09-19 13:04:54.835
1ed9fa57-d7be-49bf-8550-177174f5a860	чеснок 	VEGETABLES	GRAMS	20		2025-09-19 13:05:17.714	2025-09-19 13:05:17.714
751ce1fd-deb5-48d0-a526-61b7127a5d16	Сливки	DAIRY	MILLILITERS	300		2025-09-19 13:05:38.762	2025-09-19 13:05:38.762
aee1e13a-167e-422a-bdaa-08a89ae5c8b1	Сыр	DAIRY	GRAMS	300		2025-09-19 13:05:58.293	2025-09-19 13:05:58.293
32fe87c4-3358-4043-a624-ae8bb064acda	Говядина	MEAT	GRAMS	600		2025-09-19 13:12:17.278	2025-09-19 13:12:17.278
76e676bc-5ca5-47d8-a9c7-9fad94bcd567	Лук	VEGETABLES	GRAMS	30		2025-09-19 13:12:36.458	2025-09-19 13:12:36.458
\.


--
-- Data for Name: recipe_ingredient; Type: TABLE DATA; Schema: public; Owner: myuser
--

COPY public.recipe_ingredient (id, "recipeId", "ingredientId", quantity) FROM stdin;
8172d2b6-854f-4478-86d7-66e9ee051352	69336b3f-7b08-4d18-b7b3-b54fe621bf78	687ee58c-9c24-481c-a37e-5abb10e2105b	1
f99bb302-3c9e-4d7c-809a-e2eb58ae7960	69336b3f-7b08-4d18-b7b3-b54fe621bf78	8aa0f13d-4b79-47bc-a72d-909f1b7499c0	1
bdbefd12-6827-4777-8a0a-db43c55c8546	69336b3f-7b08-4d18-b7b3-b54fe621bf78	a687b893-025d-4c83-9199-89c51680b247	2
fb0224fd-9493-48e6-bfaf-07ee64171633	69336b3f-7b08-4d18-b7b3-b54fe621bf78	cdeaedee-3104-4d10-b13a-03c094e7a10c	350
3331b04c-7ada-48bb-bbc5-d378ae509530	6c010293-412f-47b3-810f-dc3a0f2d8a0d	caec2888-9a95-49dd-aad4-5ff979835c4b	1
2c77b963-1dc6-473b-9066-481f9f419576	6c010293-412f-47b3-810f-dc3a0f2d8a0d	ce7c6b7b-ff2e-45e0-8b97-6bd900ae9f9c	1
e71971f7-b163-4cf8-9d6e-5291d58a4025	e2acba3d-0e92-4b93-947e-26ac5e92afc1	8c26bfb1-975f-428b-af4b-8c7a8220f7fd	250
6943b493-ae80-432f-a40e-6e1950658059	e2acba3d-0e92-4b93-947e-26ac5e92afc1	74dcb533-a0ca-43e5-bb96-d5fa8d514aef	20
5587820b-104a-43df-b6c4-65ae209be5f6	e2acba3d-0e92-4b93-947e-26ac5e92afc1	1ed9fa57-d7be-49bf-8550-177174f5a860	10
fc1366be-7914-4bf6-95cd-5e90fa57d721	e2acba3d-0e92-4b93-947e-26ac5e92afc1	a687b893-025d-4c83-9199-89c51680b247	4
5f78ae64-3e39-4a97-97eb-7a4a1bf3f902	e2acba3d-0e92-4b93-947e-26ac5e92afc1	751ce1fd-deb5-48d0-a526-61b7127a5d16	200
42d1d732-225a-4506-bc5f-fffd994e6f0f	5e701b2d-8c5b-469d-a3fa-df22c4e6bd61	32fe87c4-3358-4043-a624-ae8bb064acda	500
8d956af3-e277-4ba5-8655-2f73db2b8f66	5e701b2d-8c5b-469d-a3fa-df22c4e6bd61	76e676bc-5ca5-47d8-a9c7-9fad94bcd567	300
d90045d1-ddd8-47c7-a3a6-f1e7592c70c2	5e701b2d-8c5b-469d-a3fa-df22c4e6bd61	1ed9fa57-d7be-49bf-8550-177174f5a860	30
76dec98b-c478-46ac-accd-3bffb5a66ac4	5e701b2d-8c5b-469d-a3fa-df22c4e6bd61	caec2888-9a95-49dd-aad4-5ff979835c4b	1
c4cb3ef3-05e6-4f16-a7c6-c6f555673d7a	f5cea435-72ab-40d1-9e12-6f1493bc02a7	8aa0f13d-4b79-47bc-a72d-909f1b7499c0	400
\.


--
-- Data for Name: recipes; Type: TABLE DATA; Schema: public; Owner: myuser
--

COPY public.recipes (id, name, description, image_url, "userId") FROM stdin;
69336b3f-7b08-4d18-b7b3-b54fe621bf78	Сырники	Главный секрет идеальных сырников — а точнее творожников, — творог нужно протереть через мелкое сито и отжать от влаги. Жирность предпочтительна не больше и не меньше 9%. Тесто должно получиться эластичным, чтобы при надавливании сырник не треснул на сковородке, а сохранил форму. Если все сделать правильно, получатся нежные однородные кругляшки под плотной румяной корочкой. Сырники можно запекать в духовке или готовить на пару. В рецепте не исключаются эксперименты с начинкой — сухофрукты, орехи, свежие фрукты и даже картофель лишними не будут. Приятного аппетита!	https://eda.ru/images/RecipePhoto/1x1/sirniki-iz-tvoroga_18506_photo_147696.jpg	\N
6c010293-412f-47b3-810f-dc3a0f2d8a0d	Эчпочмаки	ляляля	https://eda.ru/images/RecipePhoto/1280x960/echpochmaki_93003_photo_150401.webp	\N
e2acba3d-0e92-4b93-947e-26ac5e92afc1	Спагетти карбонара	Спагетти карбонара — хоть блюдо и итальянское, оно имеет хорошую популярность во всем мире, в том числе и у нас. Изобретенная когда-то простыми шахтерами, эта простая и сытная паста завоевала сердца и желудки многих. Для карбонары нужно выбирать такие ломтики бекона, где больше мяса и меньше жира. Если его будет много, то, вытапливаясь при готовке, он сделает пасту слишком тяжелой. 	https://eda.ru/images/RecipeStep/434x295/spagetti-karbonara-s-krasnym-lukom_17614_step_4.webp	\N
5e701b2d-8c5b-469d-a3fa-df22c4e6bd61	Азу по-татарски	Азу по-татарски. Одно из немногих блюд, удостоившихся в советской продуктовой традиции продажи с именной нарезкой. И до сих пор в кулинариях и супермаркетах можно найти говядину, которую режут соломкой и продают как азу.	https://eda.ru/images/RecipePhoto/4x3/azu-po-tatarski_21751_photo_82797.jpg	\N
f5cea435-72ab-40d1-9e12-6f1493bc02a7	Спагетти болоньезе			\N
\.


--
-- Data for Name: sessions; Type: TABLE DATA; Schema: public; Owner: myuser
--

COPY public.sessions (id, session_token, user_id, expires) FROM stdin;
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: myuser
--

COPY public.users (id, email, password, created_at, updated_at) FROM stdin;
2e2a50e2-2a49-47cd-8e3e-3923750c39ef	rus@gmail.com	$2b$10$LVbV56Wr66W6Jmp8.p1EmeXS7u/e1xG8cQF8wP2/7ppjzU9CybSWa	2025-08-27 14:20:04.783	2025-08-27 14:20:04.783
400bb20a-8e1a-45fd-b1c4-dfe36374bb6e	al@gmail.com	$2b$10$qvK4VlUVfSfJLTmCzE6aH.T7SFd5cKuU3I.a3xaMLGMB6mr2C9LFG	2025-08-27 15:08:18.45	2025-08-27 15:08:18.45
165eee97-2558-4409-ba10-4ae146e95da3	pro@gmail.com	$2b$10$UpqigRjX.NnFYLAGqzSEp.pDRcPY8jqUiliARQeth17u3rxyxfWCG	2025-08-28 11:11:23.531	2025-08-28 11:11:23.531
d7f8ffbb-7608-45e1-ba5f-9833d34ec855	test@gmail.com	$2b$10$SWdk8FsWOM2H1wdBB/jXHuADhdSvNQWw7iUG9pf8F85zqEzB6uJfO	2025-09-02 17:02:31.796	2025-09-02 17:02:31.796
2ac25827-3c28-4017-bc6e-bb29887614a1	o@gmail.com	$2b$10$e9zhnDx0EkL8LZ1rtcUD5epVTACgb/CdssKATSEyv./HRYcLyjZGm	2025-09-02 17:13:30.787	2025-09-02 17:13:30.787
88269bf1-c9f6-4c45-87bc-93c799a9ae9a	123@gmail.com	$2b$10$AjYU3ViGYgSelIIr6vse/OaYbvE81NJUQm2rVLnowI/f5mqLj0UV.	2025-09-15 10:19:46.727	2025-09-15 10:19:46.727
\.


--
-- Data for Name: verification_tokens; Type: TABLE DATA; Schema: public; Owner: myuser
--

COPY public.verification_tokens (identifier, token, expires) FROM stdin;
\.


--
-- Name: _prisma_migrations _prisma_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: myuser
--

ALTER TABLE ONLY public._prisma_migrations
    ADD CONSTRAINT _prisma_migrations_pkey PRIMARY KEY (id);


--
-- Name: accounts accounts_pkey; Type: CONSTRAINT; Schema: public; Owner: myuser
--

ALTER TABLE ONLY public.accounts
    ADD CONSTRAINT accounts_pkey PRIMARY KEY (id);


--
-- Name: ingredients ingredients_pkey; Type: CONSTRAINT; Schema: public; Owner: myuser
--

ALTER TABLE ONLY public.ingredients
    ADD CONSTRAINT ingredients_pkey PRIMARY KEY (id);


--
-- Name: recipe_ingredient recipe_ingredient_pkey; Type: CONSTRAINT; Schema: public; Owner: myuser
--

ALTER TABLE ONLY public.recipe_ingredient
    ADD CONSTRAINT recipe_ingredient_pkey PRIMARY KEY (id);


--
-- Name: recipes recipes_pkey; Type: CONSTRAINT; Schema: public; Owner: myuser
--

ALTER TABLE ONLY public.recipes
    ADD CONSTRAINT recipes_pkey PRIMARY KEY (id);


--
-- Name: sessions sessions_pkey; Type: CONSTRAINT; Schema: public; Owner: myuser
--

ALTER TABLE ONLY public.sessions
    ADD CONSTRAINT sessions_pkey PRIMARY KEY (id);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: myuser
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: accounts_provider_provider_account_id_key; Type: INDEX; Schema: public; Owner: myuser
--

CREATE UNIQUE INDEX accounts_provider_provider_account_id_key ON public.accounts USING btree (provider, provider_account_id);


--
-- Name: sessions_session_token_key; Type: INDEX; Schema: public; Owner: myuser
--

CREATE UNIQUE INDEX sessions_session_token_key ON public.sessions USING btree (session_token);


--
-- Name: users_email_key; Type: INDEX; Schema: public; Owner: myuser
--

CREATE UNIQUE INDEX users_email_key ON public.users USING btree (email);


--
-- Name: verification_tokens_identifier_token_key; Type: INDEX; Schema: public; Owner: myuser
--

CREATE UNIQUE INDEX verification_tokens_identifier_token_key ON public.verification_tokens USING btree (identifier, token);


--
-- Name: accounts accounts_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: myuser
--

ALTER TABLE ONLY public.accounts
    ADD CONSTRAINT accounts_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: recipe_ingredient recipe_ingredient_ingredientId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: myuser
--

ALTER TABLE ONLY public.recipe_ingredient
    ADD CONSTRAINT "recipe_ingredient_ingredientId_fkey" FOREIGN KEY ("ingredientId") REFERENCES public.ingredients(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: recipe_ingredient recipe_ingredient_recipeId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: myuser
--

ALTER TABLE ONLY public.recipe_ingredient
    ADD CONSTRAINT "recipe_ingredient_recipeId_fkey" FOREIGN KEY ("recipeId") REFERENCES public.recipes(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: recipes recipes_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: myuser
--

ALTER TABLE ONLY public.recipes
    ADD CONSTRAINT "recipes_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: sessions sessions_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: myuser
--

ALTER TABLE ONLY public.sessions
    ADD CONSTRAINT sessions_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

\unrestrict sexgw8Qnl5c6paJKGodBDu5Kyy8iKYQoLYuXJA1q6LlObqI8BIN98GDL5dHbgwu

