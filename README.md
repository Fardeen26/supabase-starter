**It is an todo application build using the Supabase database and contain all the knowledge that you need to start with the Supabase.**

**before using it you first have to create an account on Supabase and then create an new Project.**

**After creating an Project, get your crediantles from Project Setting > API**

- You will need `SUPABASE_URL` and `SUPABASE_ANON_KEY`:
```bash
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
```

paste this crediantles to your `.env` or `.env.local` file.

**After that you have to create an `Todos` Table in the Supabase database.**
- for creating Table go to SQL editor and paste this SQL command:
```SQL
create table if not exists todos (
  id serial primary key,
  task text not null,
  completed boolean not null default false
);
```
Now you all set!
***
You can give it a star if it helps you!