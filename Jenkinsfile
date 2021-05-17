pipeline {
    options {
        timestamps()
        skipDefaultCheckout true
        disableConcurrentBuilds()
    }
    parameters {
        string(name: 'BUILD_VERSION', defaultValue: '', description: 'The build version to deploy (optional)')
    }
    agent {
        label 'ncatsldvifx01'
    }
    triggers {
        pollSCM('H/5 * * * *')
    }  
    environment {
        PROJECT_NAME = "adme"
        DOCKER_REPO_NAME = "registry.ncats.nih.gov:5000/adme"
    }
    stages {
        stage('Build Version') {
            when {
                expression {
                    return !params.BUILD_VERSION
                }
            }
            steps{
                script {
                    BUILD_VERSION_GENERATED = VersionNumber(
                        versionNumberString: 'v${BUILD_YEAR, XX}.${BUILD_MONTH, XX}${BUILD_DAY, XX}.${BUILDS_TODAY}',
                        projectStartDate:    '1970-01-01',
                        skipFailedBuilds:    true)
                    currentBuild.displayName = BUILD_VERSION_GENERATED
                    env.BUILD_VERSION = BUILD_VERSION_GENERATED
                    env.BUILD = 'true'
                }
            }
        }
        stage('Prepare') {
            when {
                expression {
                    // Skip build when a specific version is provided
                    return !params.BUILD_VERSION
                }
            }
            steps {
                sshagent (credentials: ['871f96b5-9d34-449d-b6c3-3a04bbd4c0e4']) {
                    checkout scm
                    sh 'git submodule update --init --recursive'
                    // milestone(1)
                }
            }
        }
        stage('Build') {
            agent {
                node { 
                    label 'ncatsldvifx01'
                }
            }
            when {
                expression {
                    // Skip build when a specific version is provided
                    return !params.BUILD_VERSION
                }
            }
            steps {
                sshagent (credentials: ['871f96b5-9d34-449d-b6c3-3a04bbd4c0e4']) {
                    withEnv([
                        "IMAGE_NAME=adme",
                        "BUILD_VERSION=" + (params.BUILD_VERSION ?: env.BUILD_VERSION)
                    ]) {
                        script {
                            // build and push for opendata adme image
                            docker.withRegistry("https://registry.ncats.nih.gov:5000", "564b9230-c7e3-482d-b004-8e79e5e9720a") {
                                def image = docker.build(
                                    "${env.IMAGE_NAME}:${env.BUILD_VERSION}", "-f Dockerfile-opendata --no-cache ."
                                )
                                // Push the image to the registry
                                image.push("${env.BUILD_VERSION}")
                            }
                            
                            // build and push for ncats adme image
                            docker.withRegistry("https://registry.ncats.nih.gov:5000", "564b9230-c7e3-482d-b004-8e79e5e9720a") {
                                def image = docker.build(
                                    "ncats-adme:${env.BUILD_VERSION}", 
                                    "--no-cache ."
                                )
                                // Push the image to the registry
                                image.push("${env.BUILD_VERSION}")
                            }
                        }
                    }
                }
            }
        }
        stage('deploy docker') {
            agent {
               node { label 'ncatsldvifx01'}
            }
            steps {
                configFileProvider([
                   configFile(fileId: 'adme-dev-compose', targetLocation: 'docker-compose.yml'),
                   configFile(fileId: 'config.json', targetLocation: 'config.json') 
                ]) {
                   sh  """  
                       chmod 755 config.json
                   """
                   script {
                        def docker = new org.labshare.Docker()
                        docker.deployDockerUI()
                    }
                }
            }
        }
    }
}
