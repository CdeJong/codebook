@extends('layouts.app')

@section('title', 'Premium')

@section('content')
    <div class="content-header">
        <div class="primary-header">
            <h1 class="title">Premium</h1>
        </div>
    </div>

    <div class="page-content">
        <p>Get premium to support our weblog and to get some awesome perks and extra's</p>

        <p>Premium includes:</p>

        <ul>
            <li>Read +1000 Premium posts</li>
            <li>Premium emblem next to your displayname</li>
            <li>And so much more!</li>
        </ul>

    </div>

    <div class="plans">
        <div class="plan">
            <div class="plan-header">Populair Choice</div>
            <div class="plan-price">
                <div class="currency">$</div>
                <div class="amount">8</div>
                <div class="period">/mo</div>
            </div>
            <div class="plan-description">
                <h2 class="plan-title">Monthly</h2>
                <p>month-to-month flexibility</p>
            </div>
            <form action="{{ route('premium.subscribe') }}" method="POST">
                @csrf
                <input type="hidden" name="plan" value="1_month">
                <button type="submit" class="button">Select</button>
            </form>
        </div>

        <div class="plan">
            <div class="plan-header">Best Value</div>
            <div class="plan-price">
                <div class="currency">$</div>
                <div class="amount">10</div>
                <div class="period">/mo</div>
            </div>
            <div class="plan-description">
                <h2 class="plan-title">Yearly</h2>
                <p>pay $96 upfront and <strong>save 20%</strong></p>
            </div>
            <form action="{{ route('premium.subscribe') }}" method="POST">
                @csrf
                <input type="hidden" name="plan" value="12_month">
                <button type="submit" class="button">Select</button>
            </form>
        </div>
    </div>

    @if ($errors->any())
        <div class="error-list">
            <ul>
@foreach ($errors->all() as $error)
                <li>{{ $error }}</li>
@endforeach
            </ul>
        </div>
@endif


    
@endsection