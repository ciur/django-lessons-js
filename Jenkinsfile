pipeline {

    agent {
        docker { 
            image 'jelastic/nodejs'
            label 'slave1'
        }
    }

    parameters { 
        string(name: 'VERSION', description: 'will produce a bundle.<version>.js/css file')
    }

    stages {
        stage('Build') {
            environment {
                 HOME = '.'
            }
            steps {
                sh 'npm install --unsafe-perm'
                sh 'npm run prod'
                sh "cp static/js/bundle.js static/js/bundle.${VERSION}.js"
                sh "cp static/css/bundle.css static/css/bundle.${VERSION}.css"
                sh "rm -f *.tar.gz"
                sh "tar --append --file django-lessons.${VERSION}.tar static/css/bundle.${VERSION}.css"
                sh "tar --append --file django-lessons.${VERSION}.tar static/js/bundle.${VERSION}.js"
                sh "gzip django-lessons.${VERSION}.tar"
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
                            file: "django-lessons.${VERSION}.tar.gz"
                        );
                    }
                }
            }
        }
    }
}
