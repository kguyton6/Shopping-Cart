update cart
set quantity = quantity + 1
where product_id = $1
returning *