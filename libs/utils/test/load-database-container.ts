import { GenericContainer } from 'testcontainers';

export function loadDatabaseContainer({
    databaseName,
    user,
    password,
}: {
    databaseName: string;
    user: string;
    password: string;
}) {
    return new GenericContainer('mysql:8.1.0')
        .withExposedPorts(3306)
        .withCopyFilesToContainer([
            {
                source: __dirname + '/../../../docker/mysql/init/init.sql',
                target: '/docker-entrypoint-initdb.d/init.sql',
            },
        ])
        .withEnvironment({
            MYSQL_DATABASE: databaseName,
            MYSQL_USER: user,
            MYSQL_PASSWORD: password,
            MYSQL_ROOT_PASSWORD: 'root',
            MYSQL_ALLOW_EMPTY_PASSWORD: 'yes',
        });
}
