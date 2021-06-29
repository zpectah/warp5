<?php


namespace core\model\Market;


class Orders {

	public function get ($conn) {
		$response = [];

		// prepare
		$query = ('/*' . MYSQLND_QC_ENABLE_SWITCH . '*/' . 'SELECT * FROM orders WHERE status <= ?');
		$types = 'i';
		$args = [2];

		// execute
		$stmt = $conn -> prepare($query);
		$stmt -> bind_param($types, ...$args);
		$stmt -> execute();
		$result = $stmt -> get_result();
		$stmt -> close();

		if ($result -> num_rows > 0) {
			while($row = $result -> fetch_assoc()) {
				$response[] = $row;
			}
		}

		return $response;
	}

	public function create ($conn, $requestData) {
		$requestData = json_decode(json_encode($requestData), true);

		// prepare
		$query = ('INSERT INTO orders (
                    order_no,
                    basket_no,
                    type,
                    member_email,
                    member_phone,
                    member_name,
                    member_country,
                    member_city,
                    member_address,
                    member_zip,
                    description,
                    delivery,
                    payment,
                    basket_items,
                    price_items,
                    price_total,
                    status
                    ) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)');
		$types = 'ssssssssssssssiii';
		$args = [
			$requestData['order_no'],
			$requestData['basket_no'],
			$requestData['type'],
			$requestData['member_email'],
			$requestData['member_phone'],
			$requestData['member_name'],
			$requestData['member_country'],
			$requestData['member_city'],
			$requestData['member_address'],
			$requestData['member_zip'],
			$requestData['description'],
			$requestData['delivery'],
			$requestData['payment'],
			$requestData['basket_items'],
			$requestData['price_items'],
			$requestData['price_total'],
			1,
		];

		// execute
		if ($conn -> connect_error) {
			$response = $conn -> connect_error;
		} else {
			$stmt = $conn -> prepare($query);
			$stmt -> bind_param($types, ...$args);
			$stmt -> execute();
			$response = [
				'id' => $stmt -> insert_id
			];
			$stmt -> close();
		}

		return $response;
	}

	public function update ($conn, $requestData) {
		$requestData = json_decode(json_encode($requestData), true);

		// prepare
		$query = ('UPDATE orders SET
										order_no = ?,
                    basket_no = ?,
                    type = ?,
                    member_email = ?,
                    member_phone = ?,
                    member_name = ?,
                    member_country = ?,
                    member_city = ?,
                    member_address = ?,
                    member_zip = ?,
                    description = ?,
                    delivery = ?,
                    payment = ?,
                    basket_items = ?,
                    price_items = ?,
                    price_total = ?,
                    status = ?
                  WHERE id = ?');
		$types = 'ssssssssssssssiiii';
		$args = [
			$requestData['order_no'],
			$requestData['basket_no'],
			$requestData['type'],
			$requestData['member_email'],
			$requestData['member_phone'],
			$requestData['member_name'],
			$requestData['member_country'],
			$requestData['member_city'],
			$requestData['member_address'],
			$requestData['member_zip'],
			$requestData['description'],
			$requestData['delivery'],
			$requestData['payment'],
			$requestData['basket_items'],
			$requestData['price_items'],
			$requestData['price_total'],
			$requestData['status'],
			$requestData['id']
		];

		// execute
		if ($conn -> connect_error) {
			$response = $conn -> connect_error;
		} else {
			$stmt = $conn -> prepare($query);
			$stmt -> bind_param($types, ...$args);
			$stmt -> execute();
			$response = [
				'rows' => $stmt -> affected_rows
			];
			$stmt -> close();
		}

		return $response;
	}

	public function delete ($conn, $requestData) {
		$requestData = json_decode(json_encode($requestData), true);
		$response = null;

		if ($conn -> connect_error) return $conn -> connect_error;

		function deleteRow ($conn, $id) {
			// prepare
			$query = ('UPDATE orders SET status = 3 WHERE id = ?');
			$types = 'i';
			$args = [ $id ];

			// execute
			$stmt = $conn -> prepare($query);
			$stmt -> bind_param($types, ...$args);
			$stmt -> execute();
			$r = $stmt -> affected_rows;
			$stmt -> close();

			return $r;
		}

		$id = $requestData['id'];

		if ($id) {
			$response = deleteRow($conn, $id);
		} else if (is_array($requestData)) {
			foreach ($requestData as $item) {
				$response[] = deleteRow($conn, $item);
			}
		}

		return $response;
	}

	// TODO ->
	public function toggle ($conn, $requestData) {
		$requestData = json_decode(json_encode($requestData), true);
		$response = null;

		if ($conn -> connect_error) return $conn -> connect_error;

		function toggleRow ($conn, $id) {
			// prepare
			$query = ('UPDATE orders SET status = IF(status=2, 1, 2) WHERE id = ?');
			$types = 'i';
			$args = [ $id ];

			// execute
			$stmt = $conn -> prepare($query);
			$stmt -> bind_param($types, ...$args);
			$stmt -> execute();
			$r = $stmt -> affected_rows;
			$stmt -> close();

			return $r;
		}

		$id = $requestData['id'];

		if ($id) {
			$response = toggleRow($conn, $id);
		} else if (is_array($requestData)) {
			foreach ($requestData as $item) {
				$response[] = toggleRow($conn, $item);
			}
		}

		return $response;
	}

}
