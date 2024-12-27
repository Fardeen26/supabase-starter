**It is an todo application build using the Supabase database and contain basic knowledge to start with the Supabase.**

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

**Enable Row-Level Security (RLS):**
- Navigate to the Table Editor in Supabase.
- Click on the the todos table.
- After that click on that 3 dots on the todos table and select view policies.
- Click on the Enable RLS button.

**Go to SQL Editor and Add the following policies**
```SQL
CREATE POLICY "Allow Public Select Access" ON todos
FOR SELECT
TO authenticated, anon
USING (true);

CREATE POLICY "Allow Public Insert Access" ON todos
FOR INSERT
TO authenticated, anon
WITH CHECK (true);

CREATE POLICY "Allow Public Update Access" ON todos
FOR UPDATE
TO authenticated, anon
WITH CHECK (true);

CREATE POLICY "Allow Public Delete Access" ON todos
FOR DELETE
TO authenticated, anon
USING (true);
```

If you face any issues while writing the queries then you can utilize the Supabase AI to debug and solve the issue.

**Notes**
- This version does not include user authentication.
- RLS ensures secure data access by enforcing policies directly in the database.
- If you plan to add authentication in the future, you can adapt the RLS policies accordingly to restrict data by user.

Now you are all set!
***
You can give it a star if it helps you!