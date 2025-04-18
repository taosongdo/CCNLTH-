import requests
import json

def send_push_notification(expo_push_token, title, body):
    message = {
        'to': expo_push_token,
        'sound': 'default',
        'title': title,
        'body': body,
        # Có thể thêm 'data': {...} nếu muốn gửi dữ liệu
    }

    response = requests.post(
        'https://exp.host/--/api/v2/push/send',
        headers={
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        data=json.dumps(message)
    )

    print('Gửi thành công:', response.json())