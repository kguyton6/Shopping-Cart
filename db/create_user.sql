insert into priv_users(email, password)
values($1, $2)
returning *