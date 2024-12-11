export interface SuccessResponse<T> {
    success: boolean;
    message: string;
    data?: T | T[];
}

export interface StatisticsResponse {
    id: number;
    url: string;
    successful_requests: number;
    failed_requests: number;
    created_at: string;
    updated_at: string;
}

export interface ReplicaDetailResponse {
    id: number
    name: string
    url: string
    status: string
    health_check_point: string
    created_at: string
    updated_at: string
}

export interface ActivityLogResponse {
    id: number;
    type: string;
    message: string;
    replica_id: number;
    created_at: string;
    updated_at: string;
    replica?: ReplicaDetailResponse;
}
