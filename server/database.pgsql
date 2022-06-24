CREATE TABLE activities (
    id integer NOT NULL,
    user_id integer NOT NULL,
    name character varying NOT NULL,
    date_created date NOT NULL,
    color character varying NOT NULL
);

CREATE SEQUENCE activities_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER SEQUENCE activities_id_seq OWNED BY activities.id;

ALTER TABLE ONLY activities ALTER COLUMN id SET DEFAULT nextval('activities_id_seq'::regclass);

CREATE TABLE activities_log (
    id integer NOT NULL,
    user_id integer NOT NULL,
    activity_id integer NOT NULL,
    date_logged date NOT NULL,
    time_spent integer NOT NULL
);

CREATE SEQUENCE activities_log_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER SEQUENCE activities_log_id_seq OWNED BY activities_log.id;

ALTER TABLE ONLY activities_log ALTER COLUMN id SET DEFAULT nextval('activities_log_id_seq'::regclass);

CREATE TABLE users (
    user_id integer NOT NULL,
    first_name character varying NOT NULL,
    last_name character varying NOT NULL,
    email character varying NOT NULL,
    password character varying NOT NULL
);

CREATE SEQUENCE users_user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER SEQUENCE users_user_id_seq OWNED BY users.user_id;

ALTER TABLE ONLY users ALTER COLUMN user_id SET DEFAULT nextval('users_user_id_seq'::regclass);

ALTER TABLE ONLY activities_log
    ADD CONSTRAINT activities_log_pkey PRIMARY KEY (id);

ALTER TABLE ONLY activities
    ADD CONSTRAINT activities_pkey PRIMARY KEY (id);

ALTER TABLE ONLY users
    ADD CONSTRAINT users_pkey PRIMARY KEY (user_id);