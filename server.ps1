param(
  [switch][bool]$generate,
  [switch][bool]$SkipDeps,
  [switch][bool]$BuildOnly
)

$Args = ""
if ($generate) {
  $Args = "-generate"
}

try {
  taskkill.exe /im server.exe /f
}
catch {
}

try {
  Push-Location $PSScriptRoot\server
  try {
    Write-Output "Building protocol buffers..."
    $env:DOCKER_BUILDKIT = 1
    $Process = Start-Process -NoNewWindow -FilePath (Get-Command docker).Path -Wait -ArgumentList @("build", "..", "-f", "../Dockerfile", "--target=protocol_build", "--tag=configstore_protocol_build")
    if ($Process.ExitCode -ne 0) {
      Write-Output "Docker exited with exit code $($Process.ExitCode)"
    }

    $DockerContainerId = $null
    try {
      $DockerContainerId = $(docker.exe create configstore_protocol_build)
      if (Test-Path $PSScriptRoot/workdir_ts/) {
        Remove-Item $PSScriptRoot/workdir_ts/ -Force -Recurse
      }
      if (Test-Path $PSScriptRoot/workdir_go/) {
        Remove-Item $PSScriptRoot/workdir_go/ -Force -Recurse
      }
      if (Test-Path $PSScriptRoot/runtime_ts/) {
        Remove-Item $PSScriptRoot/runtime_ts/ -Force -Recurse
      }
      docker.exe cp ${DockerContainerId}:/workdir_ts/ $PSScriptRoot/
      docker.exe cp ${DockerContainerId}:/workdir_go/ $PSScriptRoot/
      docker.exe cp ${DockerContainerId}:/grpc_runtime_out/ $PSScriptRoot/
      Move-Item $PSScriptRoot/grpc_runtime_out $PSScriptRoot/runtime_ts
      Start-Sleep -Seconds 1
      Copy-Item $PSScriptRoot/workdir_go/meta.pb.go $PSScriptRoot/server/meta.pb.go -Force
      if (Test-Path $PSScriptRoot/server-ui/src/api) {
        Remove-Item $PSScriptRoot/server-ui/src/api -Recurse -Force
        Start-Sleep -Seconds 1
      }
      Copy-Item -Recurse $PSScriptRoot/workdir_ts/api $PSScriptRoot/server-ui/src/api -Force
      if (Test-Path $PSScriptRoot/server-ui/grpc-web) {
        Remove-Item $PSScriptRoot/server-ui/grpc-web -Recurse -Force
        Start-Sleep -Seconds 1
      }
      Copy-Item -Recurse $PSScriptRoot/runtime_ts/package $PSScriptRoot/server-ui/grpc-web -Force
      if (Test-Path $PSScriptRoot/workdir_ts/) {
        Remove-Item $PSScriptRoot/workdir_ts/ -Force -Recurse
      }
      if (Test-Path $PSScriptRoot/workdir_go/) {
        Remove-Item $PSScriptRoot/workdir_go/ -Force -Recurse
      }
      if (Test-Path $PSScriptRoot/runtime_ts/) {
        Remove-Item $PSScriptRoot/runtime_ts/ -Force -Recurse
      }
    }
    finally {
      docker.exe rm $DockerContainerId
    }

    Write-Output "Building server..."
    go.exe build -mod vendor -o server.exe .
    if ($LastExitCode -ne 0) {
      exit $LastExitCode
    }

    if (!$BuildOnly) {
      Write-Output "Running & testing server..."
      $env:CONFIGSTORE_GOOGLE_CLOUD_PROJECT_ID = "configstore-test-001"
      $env:CONFIGSTORE_GRPC_PORT = "13389"
      $env:CONFIGSTORE_HTTP_PORT = "13390"
      $env:CONFIGSTORE_SCHEMA_PATH = "schema.json"
      $env:CONFIGSTORE_ALLOWED_ORIGINS = "http://localhost:3000"
      .\server.exe $Args
      if ($LastExitCode -ne 0) {
        exit $LastExitCode
      }
    }
  }
  finally {
    Pop-Location
  }
}
finally {
  try {
    taskkill.exe /im server.exe /f
  }
  catch {
  }
}