FROM container-registry.oracle.com/graalvm/native-image:23 AS build
WORKDIR /app
COPY . .
RUN ./mvnw --no-transfer-progress native:compile -Pnative

FROM alpine:latest
WORKDIR /app
COPY --from=build /app/target/rotina-service rotina-service
EXPOSE 8085
ENTRYPOINT ["./rotina-service"]
