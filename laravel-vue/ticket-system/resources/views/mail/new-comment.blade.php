<div>
    <p>Hello {{ $user->first_name }} {{ $user->first_name }},</p>
    <br>
    <p>{{ $comment_user->first_name }} {{ $comment_user->last_name }} posted a new comment on your ticket: {{ $ticket->title }}</p>
</div>