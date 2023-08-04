pipeline {
    agent any
    tools {
    maven 'MAVEN3'
    sonarqube 'sonarqube 10'
    docker 'docker '
  } 
    stages {
        stage ('clone repository'){
            steps{
                checkout scm
            }
        }
        stage('code quality check'){
            steps{
                sh "build sonar"
            }
        }
        stage ('build'){
            steps{
                sh "mvn clean package"
            }
        }
        stage ('build docker image'){
            steps{
                sh "dockerImage= docker build -t registry:$tag "
                echo "Image built successfully"
            }
        }
        stage('push image to ECR'){
            steps{
                echo "Pushing Image to ECR"
                sh "docker push dockerImage"
            }
        }
        stage('trigger update manifest job'){
            steps{
               echo "triggering updatemanifest job"
               build job: 'updatemanifest', parameters: [string(name: 'DOCKERTAG', value: env.BUILD_NUMBER)]
            }
        }
    }
    
}