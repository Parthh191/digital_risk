def calculate_score(total_volume: float, transaction_count: int, unique_days: int) -> float:
    volume_score = min(total_volume / 10000, 1.0) * 50
    frequency_score = min(transaction_count / 100, 1.0) * 30
    consistency_score = min(unique_days / 30, 1.0) * 20

    return volume_score + frequency_score + consistency_score