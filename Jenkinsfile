pipeline {

    agent {
        docker { 
            image 'jelastic/nodejs'
            label 'slave1'
        }
    }

    parameters { 
        string(name: 'VERSION', description: 'will produce a all.<version>.js/css file')
    }

    stages {
        stage('Build') {
            environment {
                 HOME = '.'
            }
            steps {
                sh 'npm install --unsafe-perm'
                sh 'npm run prod'
                sh "cp static/js/all.js static/js/all.${VERSION}.js"
                sh "cp static/css/all.css static/css/all.${VERSION}.css"
                sh "rm -f *.tar.gz"
                sh "tar --append --file django-lessons.${VERSION}.tar static/css/all.${VERSION}.css"
                sh "tar --append --file django-lessons.${VERSION}.tar static/js/all.${VERSION}.js"
                sh "gzip django-lessons-js.${VERSION}.tar"
                archiveArtifacts artifacts: '*.tar.gz'
            }
        }
        stage("Upload") {
            steps {
                script {
                    withAWS(region:'us-east-1',credentials:'s3-builds') {
                        s3Upload(
                            bucket:"builds-dgl", 
                            path: 'django-lessons-js/', 
                            file: "django-lessons-js.${VERSION}.tar.gz"
                        );
                    }
                }
            }
        }
    }
}
