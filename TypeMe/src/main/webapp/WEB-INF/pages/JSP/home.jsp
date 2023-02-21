<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.2/dist/css/bootstrap.min.css">
    <script src="https://cdn.jsdelivr.net/npm/jquery@3.6.1/dist/jquery.slim.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.1/dist/umd/popper.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.6.2/dist/js/bootstrap.bundle.min.js"></script>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.1/jquery.min.js"></script>
    <script src="https://unpkg.com/sweetalert/dist/sweetalert.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.5.0/Chart.min.js"></script>    
    <title>Welcome to Typing Speed Tester by Bhaskar</title>
    <link rel="icon" type="image/x-icon" href="Icon/favicon.png">
</head>
<body>
    <div class="container-fluid bg-secondary mt-3">
        <div class="row">
            <div class="col-md-12 col-sm-12 mb-2">
                <div class="card mt-2">
                    <div class="card-header">
                        <h2 align="center" style="text-transform: uppercase; letter-spacing: 10px; color:red;"><b>Type and test your typing skill</b></h2>
                    </div>
                    <div class="card-body mt-2">
                        <div class="card">
                            <div class="card-body">
                                <div class="row">
                                    <div class="col-xs-12 col-md-6 col-sm-6 col-xl-6">
                                        <select class="form-control" id="coption" name="coption" title="Select option for case check">
                                            <option value="wcase">With case sensitive</option>
                                            <option value="wocase" selected>Without case sensitive</option>
                                        </select>
                                    </div>
                                    <div class="col-xs-12 col-md-6 col-sm-6 col-xl-6">
                                        <select class="form-control" id="language" name="language" title="Select your test language">
                                            <option value="english" selected>ENGLISH</option>
                                            <option value="assamese">ASSAMESE</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="card">
                            <div class="card-body">
                                <!--<button class="btn btn-success" id="1min">Start 1 minute test</button>-->
                                <input type="radio" name="radio_time" id="radio_time_1" value="1" checked>1 minute  &nbsp;&nbsp;
                                <input type="radio" name="radio_time" id="radio_time_2" value="2">2 minute  &nbsp;&nbsp;
                                <input type="radio" name="radio_time" id="radio_time_3" value="3">3 minute  &nbsp;&nbsp;
                                <input type="radio" name="radio_time" id="radio_time_4" value="4">4 minute  &nbsp;&nbsp;
                                <input type="radio" name="radio_time" id="radio_time_5" value="5">5 minute  &nbsp;&nbsp;
                                <button class="btn btn-primary" id="btntryagain2">Retake Test</button>
                            </div>
                        </div>
                        <div class="card bg-secondary text-white mt-1">
                            <div class="card-body" id="timer">
                                <div class="row mb-2 justify-content-center">
                                    <div class="col-md-12 col-sm-12 text-center">
                                        <p id="countdowntext"></p>
                                    </div>
                                </div>
                                <div class="row justify-content-center">
                                    <div class="col-md-4 col-sm-4 col-xs-4 text-center">
                                            <p id="Mint"></p>
                                    </div>
                                    <div class="col-md-2 col-sm-2 col-xs-2 text-center">
                                            <p>::</p>
                                    </div>
                                    <div class="col-md-4 col-sm-4 col-xs-4 text-center">
                                            <p id="Sec"></p>
                                    </div>
                                </div>
                                <div class="row justify-content-center">
                                    <div class="col-md-3 col-sm-3 col-xs-3 text-center">  
                                    </div>
                                    <div class="col-md-6 col-sm-6 col-xs-6 text-center">
                                            <p id="typedWord"></p>
                                    </div>
                                    <div class="col-md-3 col-sm-3 col-xs-3 text-center">
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="card bg-dark">
                            <div class="card-body">
                                <p class="text-center text-white" style="overflow-y: hidden; height:50px;" id="rawTextData"></p>
                            </div>
                        </div>
                        <textarea rows="5" class="form-control mt-2" id="mainTextArea" style="cursor: zoom-in; font-size:30px;" placeholder="Start Typing..."></textarea>
                    </div>
                    <div class="card">
                        <div class="card-body">
                            <div id="msg"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!---Modal box of export certificate details-->
        <button type="button" class="btn btn-primary" id="btnModal" data-toggle="modal" data-target="#myModal" style="display:none;">
            Open Result
        </button>
        <!-- The Modal -->
        <div class="modal fade" id="modal2">
            <div class="modal-dialog modal-dialog-centered modal-lg">
                <div class="modal-content">
                    <!-- Modal Header -->
                    <div class="modal-header bg-success">
                        <h4 class="modal-title">Enter details to generate your certificate</h4>
                        <button type="button" class="close" data-dismiss="modal">&times;</button>
                    </div>
                    
                    <!-- Modal body -->
                    <div class="modal-body">
                        <div class="row p-3">
                            <div class="col-md-12 mt-2">
                                <input type="text" id="name" class="form-control" placeholder="Enter your full name to be printed on certificate" title="Enter your full name to be printed on certificate">
                            </div>
                            <div class="col-md-12 mt-4">
                                <input type="text" id="address" class="form-control" placeholder="Enter your full address to be printed on certificate" title="Enter your full address to be printed on certificate">
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button class="btn btn-success" id="btnCertificate">Get Certificate</button>
                    </div>
                </div>
            </div>
        </div>
        
        
        <!--Modal for result-->
        <div class="modal fade" id="myModal">
            <div class="modal-dialog modal-dialog-centered modal-lg">
                <div class="modal-content">
                    <!-- Modal Header -->
                    <div class="modal-header bg-success">
                        <h4 class="modal-title">Your Typing Score</h4>
                        <button type="button" class="close" data-dismiss="modal">&times;</button>
                    </div>
                    
                    <!-- Modal body -->
                    <div class="modal-body">
                        <div class="row">
                            <div class="col-md-12">
                                <p style="font-size: 30px;" align="center">You typed at <b><span id="wpm"></span></b> Word Per Minutes(WPM).</p>
                            </div>
                            <div class="col-md-12">
                                <p style="font-size: 30px;" align="center">Accuracy is: <b><span id="accuracy"></span></b></p>
                            </div>
                            
                            <div class="col-md-12 mt-4">
                                <p>Wrong word typed: <b><span id="wrongWords"></span></b></p>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-6 col-sm-6 col-xs-12">
                                <canvas id="barChart" style="width:100%;max-width:600px"></canvas>
                            </div>
                            <div class="col-md-6 col-sm-6 col-xs-12">
                                <canvas id="pieChart" style="width:50%;max-width:300px"></canvas>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Modal footer -->
                    <div class="modal-footer">
                        <button class="btn btn-primary" id="btntryagain">Retake Test</button>
                        <button type="button" class="btn btn-success" id="btnGenerate" data-toggle="modal" data-dismiss="modal" data-target="#modal2">Generate Certificate</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</body>
    <script src="js/home.js"></script>
</html>