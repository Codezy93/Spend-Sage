import numpy as np
from statsmodels.tsa.arima.model import ARIMA

def forecast_next_15(event):
    history = event['history']
    order=(1, 1, 1)
    """
    Fit an ARIMA model on the given history and forecast the next 15 values.

    Parameters
    ----------
    history : list of floats
        Time-ordered series (e.g., last 15 days of expenses).
    order : (p, d, q)
        ARIMA hyperparameters. With very short series, keep these small.

    Returns
    -------
    list of floats
        Forecasted next 15 values.
    """
    if len(history) < 5:
        raise ValueError("Need at least 5 points to fit a tiny ARIMA model.")

    y = np.asarray(history, dtype=float)

    model = ARIMA(y, order=order)
    fitted = model.fit()

    forecast = fitted.forecast(steps=15)
    return forecast.tolist()