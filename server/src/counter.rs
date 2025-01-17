use axum::{extract::State, http::StatusCode, response::IntoResponse, routing::get, Router};
use std::sync::{Arc, RwLock};

#[derive(Debug, Default, Clone)]
struct Counter {
    n: Arc<RwLock<usize>>,
}

impl Counter {
    #[allow(clippy::missing_panics_doc)]
    pub fn increment(&self) -> usize {
        let mut n = self.n.write().unwrap();

        *n += 1;

        *n
    }

    #[allow(clippy::missing_panics_doc)]
    #[must_use]
    pub fn value(&self) -> usize {
        *self.n.read().unwrap()
    }
}

async fn get_counter_value(State(counter): State<Counter>) -> impl IntoResponse {
    let value = counter.value();

    (StatusCode::OK, format!("{value}"))
}

async fn increment_counter_value(State(counter): State<Counter>) -> impl IntoResponse {
    let value = counter.increment();

    (StatusCode::ACCEPTED, format!("{value}"))
}

pub fn router() -> Router {
    let counter = Counter::default();

    Router::new()
        .route(
            "/counter",
            get(get_counter_value).post(increment_counter_value),
        )
        .with_state(counter)
}
