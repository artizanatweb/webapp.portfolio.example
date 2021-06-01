@extends('layouts.main')

@section('content')
    <main id="page">
        <div id="default-page">
            <div class="container">
                <div class="row">
                    <div class="col s12 center">
                        <h5>Digital marketing campaign ideas for BOEMIA FURNITURE</h5>
                        <p>Piggyback on the following trends that emerged because of the COVID pandemic:</p>
                    </div>
                </div>
                <div class="row">
                    <div class="col s12 campaigns">
                        <div class="card grey lighten-5 campaignCard">
                            <div class="card-image">
                                <img src="/images/home-cooking.jpg" />
                                <a href="/home-cooking" class="btn-floating btn-large halfway-fab waves-effect waves-light red" title="view sketch"><i class="material-icons">open_in_new</i></a>
                            </div>
                            <div class="card-content">
                                <span class="card-title">Home cooking</span>
                                <p>BOEMIA Kitchens are designed for healthy cooking and social interaction.</p>
                            </div>
                        </div>
                        <div class="card grey lighten-5 campaignCard">
                            <div class="card-image">
                                <img src="/images/working-kitchen.jpg" />
                                <a href="/working-kitchen" class="btn-floating btn-large halfway-fab waves-effect waves-light red" title="view sketch"><i class="material-icons">open_in_new</i></a>
                            </div>
                            <div class="card-content">
                                <span class="card-title">Work from home</span>
                                <p>BOEMIA Kitchens are designed as "Working Kitchen".</p>
                            </div>
                        </div>
                        <div class="card grey lighten-5 campaignCard">
                            <div class="card-image">
                                <img src="/images/smart.jpg" />
                                <a href="/smart-kitchen" class="btn-floating btn-large halfway-fab waves-effect waves-light red" title="view sketch"><i class="material-icons">open_in_new</i></a>
                            </div>
                            <div class="card-content">
                                <span class="card-title">Smart Kitchen</span>
                                <p>BOEMIA Kitchens are designed to make better use of any space using the latest technologies.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </main>
@endsection
