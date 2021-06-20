# API

## Settings

Path | Request | Response | CRSF | Description
--- | --- | --- | --- | ---
``/api/get_settings`` |  | {...} | true |
``/api/update_settings`` | {...} |  | true |

## User

Path | Request | Response | CRSF | Description
--- | --- | --- | --- | ---
``/api/get_profile`` |  | {...} | true |
``/api/update_profile`` | {...} |  | true |
``/api/user_login`` | {email,password} | status | false |
``/api/user_logout`` |  |  | true |
``/api/user_lost_password`` | {email} | status | false |
``/api/user_lost_password_reset`` | {token} | status | false |

... TODO
