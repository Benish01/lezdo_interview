class CustomResponse:
    @staticmethod
    def success_response(status='success', status_code=200, data=None, message=""):
        return {
            "status": status,
            "status_code": status_code,
            "data": data or {},
            "message": message
        }
    
    @staticmethod
    def failure_response(status='failed', status_code=500, data=None, message="Internal server error"):
        return {
            "status": status,
            "status_code": status_code,
            "data": data or {},
            "message": message
        }
